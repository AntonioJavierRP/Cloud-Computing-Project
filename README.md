# Proyecto Cloud Computing 2018-2019.


## Proyecto a desarrollar.
#### Infraestructura virtual para mi TFG sobre detección de plagio en R. 

## Descripción.

Mi trabajo de fin de grado consistió en buscar una solución al problema de que no existía una forma eficaz y eficiente de detectar plagio entre programas escritos en R de alumnos. Es por esto que tuve que añadir un módulo a una aplicación ya existente para la detección de plagio en código fuente sobre un conjunto de archivos escritos en un mismo lenguaje de programación. Esta aplicación es llamada [JPLAG](https://github.com/jplag/jplag) y el módulo que he creado permite que JPLAG también pueda detectar plagios en programas escritos en R.

JPLAG era posible de usar como servicio web durante las primeras versiones de su desarrollo, pero actualmente no está actualizado con los nuevos lenguajes y bibliotecas añadidas (además de que no permite el acceso a usuarios que no estuviesen ya en su base de datos de antes). Esto nos obliga a que, para poder ejecutar JPLAG, lo descargemos sobre nuestra propia máquina local y lo ejecutemos.

Por esta razón,en este proyecto crearemos una infraestructura donde poder desplegar [JPLAG con mi módulo](https://github.com/AntonioJavierRP/jplag) donde los usuarios se puedan crear una cuenta y ejecutar el programa de forma remota sobre un conjunto de archivos que ellos mismos suban a la aplicación.

## Cliente potencial
Cualquier institución educativa que desee aplicar a este software de detección de plagio en los trabajos de sus alumnos.

## Arquitectura 
Se utilizará una arquitectura basada en microservicios, para poder tener módulos independientes(servicios) para las diferentes partes en las que se divide la infraestructura:

- Módulo de registro de los usuarios.
- Módulo de procesado de los archivos fuentes para convertirlos en tokens del lenguaje que se especifica.
- Módulo de aplicación del algoritmo de JPLAG para comparación de archivos.
- Módulo de almacenamiento de resultados y usuarios usando base de datos NoSQL.

Además nos interesa esta arquitectura para poder escalar el sistema de forma independiente añadiendo soporte a más lenguajes por ejemplo o algún módulo de visualización de los resultados.



## Hitos del proyecto
[Enlace a los hitos del proyecto](https://github.com/AntonioJavierRP/Cloud-Computing-Project/milestones).


## Licencia
GNU General Public License v3.0.