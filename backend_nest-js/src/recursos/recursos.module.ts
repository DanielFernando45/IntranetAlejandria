import { Module } from '@nestjs/common';
import { GuiasController } from './controllers/guias.controller';
import { HerramientasController } from './controllers/herramientas.controller';
import { NoticiasController } from './controllers/noticias.controller';
import { TutorialesController } from './controllers/tutoriales.controller';
import { GuiasService } from './services/guias.service';
import { HerramientasService } from './services/herramientas.service';
import { NoticiasService } from './services/noticias.service';
import { TutorialesService } from './services/tutoriales.service';


@Module({
  controllers: [GuiasController,HerramientasController,NoticiasController,TutorialesController],
  providers: [GuiasService,HerramientasService,NoticiasService,TutorialesService],
})
export class RecursosModule {}
