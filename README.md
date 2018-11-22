# Proyecto Cloud Computing 2018-2019.


## Proyecto a desarrollar.
#### Sistema de planificación de entrenamiento físico. 

## Descripción.

Para conseguir mejorar consistentes en nuestro rendimiento físico es necesario salir a entrenar de forma regular siguiendo una estructura de entrenamiento concreta. 
Para hacer esto la gente se suele organizar mediante plannings de entrenamiento aunque en estos no se puede predecir si los días elegidos son los idóneos para esto ya que puede hacer más frío o calor de lo esperado, o incluso llover o granizar. Lo que haría que no pudiésemos entrenar ese día y esto, además de desmotivar, rompe en gran parte los hábitos saludables que tanto nos cuesta conseguir.

En este proyecto propongo desarrollar un servicio en la nube en el que se podrá gestionar la planificación deportiva día a día para la próxima semana, mes, año o cualquier cantidad de tiempo que se quiera entrenar, teniendo en cuanta las condiciones atmosféricas de cada día, en caso de que se fuese a entrenar fuera.



## Cliente potencial
Cualquier persona que esté interesada en poder organizar sus futuras sesiones de ejercicios de forma que las condiciones meteorológicas no se interpongan con estas.

## Arquitectura 
Se utilizará una arquitectura basada en microservicios, para poder tener módulos independientes(servicios) para las diferentes partes en las que se divide la sistema y poder escalar cada uno de estos de forma individual.

Podemos listar los siguientes servicios:

- Servicio de almacen de los datos del usuario, su plan y sus días de entrenamiento. Para esto usaré una base de datos NoSQL MongoDB.
- Módulo de procesado de la información que ha especificado el usuario sobre su entrenamiento teniendo en cuenta sus preferencias y combinándolo con los datos referentes al tiempo atmosférico.
- Servicio de LOG para monitorización de la aplicación.


Así mismo, existirá un microservicio del que obtendremos los datos meteorológicos de los próximos 15 días, pero este no lo desarrollaremos nosotros sino que utilizaremos el del proyecto de una compañera.

## Lenguaje Utilizado
Se utilizará javascript junto al framework Express para construir el servicio web.


## Hitos del proyecto
[Enlace a los hitos del proyecto](https://github.com/AntonioJavierRP/Cloud-Computing-Project/milestones).


## Licencia
GNU General Public License v3.0.

URL de despliege hito 2


Despliege hecho en https://schedule-cloud-computing.herokuapp.com/