import { InjectRepository } from "@nestjs/typeorm";
import { Guia } from "../entities/guia.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UploadedFile } from '@nestjs/common';
import { CreateGuiaDto } from "../dto/guias-dto/create-guia.dto";
import { UpdateGuiaDto } from "../dto/guias-dto/update-guia.dto";
import { BackbazeService } from "src/backblaze/backblaze.service";

@Injectable()
export class GuiasService{
    constructor(
        private readonly backblazeService:BackbazeService,

        @InjectRepository(Guia)
        private guiasRepo:Repository<Guia>
    ){}

    async postGuia(files:{url_imagen: Express.Multer.File[],doc_url: Express.Multer.File[]},body:CreateGuiaDto){
        const b2=this.backblazeService.getClient()
        await b2.authorize()
        const bucket_id=process.env.BUCKET_ID
        

        const url_imagen=files.url_imagen?.[0]
        const doc_url=files.doc_url?.[0]
        
        if(!url_imagen || !doc_url)throw new BadRequestException("No se enviaron los documentos necesarios con su nombre")
        
        const uploadUrlResponse=await b2.getUploadUrl({
            bucketId:bucket_id
        })
        const uploadUrl=uploadUrlResponse.data.uploadUrl
        
        const authorizationToken=uploadUrlResponse.data.authorizationToken
        
        const imagen=await this.uploadFileBucket(b2,uploadUrl,authorizationToken,url_imagen)
        const documento=await this.uploadFileBucket(b2,uploadUrl,authorizationToken,doc_url)
        const newGuia=this.guiasRepo.create({
            ...body,
            url_imagen:imagen.data.fileName,
            doc_url:documento.data.fileName
        })
        await this.guiasRepo.save(newGuia)

        return {
            mensaje:"Agregado satisfactoriamente",
            imagen_url:imagen.data.fileName,
            doc_url:documento.data.fileName
        }
    }

    async getSignedUrl(fileName:string):Promise<string>{
    
        const b2=this.backblazeService.getClient()
        const authResponse=await b2.authorize()
        const downloadUrl=authResponse.data.downloadUrl

        const bucketId = process.env.BUCKET_ID;
        const bucketName = process.env.BUCKET_NAME;
        
        const validDuration=60*60*10

        const {data}=await b2.getDownloadAuthorization({
            bucketId,
            fileNamePrefix:fileName,
            validDurationInSeconds:validDuration
        })
        console.log(data)

        const baseUrl=`${downloadUrl}/file/${bucketName}/${fileName}`
        const signedUrl=`${baseUrl}?Authorization=${data.authorizationToken}`

        return signedUrl
    }

    async uploadFileBucket(b2,uploadUrl,authorizationToken,file){
        try{
        const response=await b2.uploadFile({
            uploadUrl,
            uploadAuthToken:authorizationToken,
            fileName:`guias/${Date.now()}-${file.originalname}`,
            data:file.buffer,
            mime:file.mimetype
        })
        return response
        }catch(err){
            throw new InternalServerErrorException(`No se agrego el archivo con nombre:${file.originalName}`)
        }
    }

    async patchGuia(id:number,body:UpdateGuiaDto,files:{url_imagen?:Express.Multer.File[];doc_url?:Express.Multer.File[]}){
        const b2=this.backblazeService.getClient()
        await b2.authorize()
        const bucket_id=process.env.BUCKET_ID
        
        const uploadUrlResponse=await b2.getUploadUrl({
            bucketId:bucket_id
        })
        const uploadUrl=uploadUrlResponse.data.uploadUrl
        console.log(uploadUrl)
        const authorizationToken=uploadUrlResponse.data.authorizationToken

        const updatedGuia=await this.guiasRepo.findOneBy({id})
        if(!updatedGuia)throw new BadRequestException("No se actualizo ningun registro")
        Object.assign(updatedGuia,body)

        const url_imagen=files.url_imagen?.[0]
        const doc_url=files.doc_url?.[0]
        if(url_imagen){
            const response=await this.uploadFileBucket(b2,uploadUrl,authorizationToken,url_imagen)
            updatedGuia.url_imagen=response.data.fileName
        }
        if(doc_url){
            const response=await this.uploadFileBucket(b2,uploadUrl,authorizationToken,doc_url)
            updatedGuia.doc_url=response.data.fileName
        }
        await this.guiasRepo.save(updatedGuia)
        return {"message":`Se actualizaron satisfactoriamente la guia con id:${id}`}
    }

    async deleteGuia(id:number){
        const deletedGuia=await this.guiasRepo.delete({id})
        if(deletedGuia.affected===0)throw new BadRequestException("No se elimino ninguna guia")
        return {"message":`Se elimno satisfactoriamente la guia con id: ${id}`}
    }

    async listGuias(){
        const listGuias=await this.guiasRepo.find()
        if(listGuias.length===0)throw new NotFoundException("No se encontraron registros")

        const responseGuias=Promise.all(listGuias.map(async(guia)=>{
            const linkImagen=await this.getSignedUrl(guia.url_imagen)
            const linkDocumento=await this.getSignedUrl(guia.doc_url)

            return({
                "id":guia.id,
                "titulo":guia.titulo,
                "descripcion":guia.descripcion,
                "url_imagen":guia.url_imagen,
                "imagen":linkImagen,
                "doc_url":guia.doc_url,
                "documento":linkDocumento
            })
        }))

        return responseGuias
    }

    async listOneGuia(id:number){
        const guia=await this.guiasRepo.findOneBy({id})
        if(!guia)throw new NotFoundException(`No se encontro una guia con el id: ${id}`)
        const imagen=await this.getSignedUrl(guia.url_imagen)
        const documento=await this.getSignedUrl(guia.doc_url)
        Object.assign(guia,{imagen,documento})
        return guia
    }
}
