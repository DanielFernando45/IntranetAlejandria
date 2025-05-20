import { BadRequestException } from "@nestjs/common"

export const fileFilter=(req:Express.Request,file:Express.Multer.File,callback:Function)=>{
    if(!file) return callback(new Error('File is empty'),false)
    
    // for(const file of files){
    //     const fileExtension=file.mimetype.split('/')[1]
    //     console.log(fileExtension)
    //     const validExtension=['vnd.openxmlformats-officedocument.wordprocessingml.document','pdf','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.ms-excel']

    //     if(!validExtension.includes(fileExtension)) return callback(new BadRequestException(`Tipo de documento invalido:${fileExtension}`),false)
    // }

    const fileExtension=file.mimetype.split('/')[1]
    console.log(file.mimetype)
    const validExtension=['vnd.openxmlformats-officedocument.wordprocessingml.document','pdf','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.ms-excel']

    if(validExtension.includes(fileExtension)){
        return callback(null,true)
    }
    
    callback(null,true)
}   