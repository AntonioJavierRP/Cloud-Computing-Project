Despliegue https://schedule-cloud-computing.herokuapp.com/


# Hito 2. Creación de un microservicio y despliegue en PaaS

En esta tercera entrega de la asignatura se ha creado una estructura muy simple de la función básica de nuestro proyecto de forma que se pudiese acceder a la información a través de comandos HTTP(get, put, post y delete).

Una vez que se ha comprobado que la estructura funcionaba bien de forma local, esta se ha desplegado en Heroku.

He elegido Heroku como PaaS para mi servicio web debido a que es gratuito(para nuestro caso), tiene una amplia documentación y tutoriales para iniciarse en su uso y además es compatible con nodejs.

## Framework usado
Como ya dije antes, he usado javascript en node JS, por lo que el framework que he usado ha sido express.

## Funcionalidad Básica creada

He creado tres clases:
- Plan: Es la clase principal que integra al resto. En esta figura como artibuto el usuario (tipo PerfilUsuario), la fecha de inicio del plan, la duración del plan, y un vector completo de todas las actividades (sesiones de entrenamiento) que se piensan hacer.
- PerfilUsuario: en esta figura el nombre del usuario y dos atributos inicializados a un valor por defecto pero que es modificable y que influenciará a la hora de decidir si se puede realizar una actividad cierto día. 
- Activity: cada objeto de esta clase es una sesión de entrenamiento diferente. Cada sesión de entrenamiento tiene asignado:
    -   Un id.
    -   Un día (pero no en formato fecha sino en enteros hasta el día último de entrenamiento en base a la duración del plan)
    -   Un tipo (que por ahora sólo puede ser: correr, pasear, salir en bici, entrenamiento de fuerza, nadar y deporte de equipo)
    -   Una descripción (opcional)
    -   Una duración en horas del ejercicio.
    -   Una hora de inicio del ejercicio.
    -   Y un booleano que indica si se va a realizar o no en el exterior.

### Cada una de las acciones que se puede hacer sobre esta estructura es posible llevarlo a cabo mediante operaciones HTTP.

#### Consultas con GET

- Status Ok en "/"
- Plan completo en "/plan"
- Detalles del usuario en "/plan/usuario"
- Nombre del usuario en "/plan/usuario/nombre"
- Temperatura mínima a la que el usuario está dispuesto a hacer ejercicio en "/plan/usuario/temp"
- Tolerancia a la lluvia del usuario en "/plan/usuario/rain"
- Lista de todas las actividades en '/plan/actividades'
- Lista de todas las actividades por día en '/plan/actividades/:dia'
- Actividad concreta en cierto día en '/plan/actividades/:dia/:id'


#### Modificaciones con PUT

- Valores del usuario en "/plan/usuario"
- Valores de cierta actividad en "/plan/actividades/:dia/:id"

#### Nuevos elementos con POST

- Nueva actividad en "/plan/actividades"

#### Eliminar elementos con DELETE

- Eliminar actividad concreta en '/plan/actividades/:dia/:id'

## Despliegue en heroku

Para realizar el despliegue en Heroku en seguido las instrucciones básicas de la [página de documentación de heroku sobre node js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

En el archivo procfile se especifica los comandos que tiene que ejecutar mi app de Heroku al iniciarse.

Para realizar los tests de cada operación he creado un fichero test.js dentro de la carpeta test del proyecto.
Para especificar los tests he usado Supertest y Mocha.

### Conexión de github con Heroku
Para que cuando realicemos un push desde nuestro a equipo local al master de Github el servicio se despliegue automáticamente a Heroku he usado [Codeship](https://codeship.com/). 


Para ello tan solo he tenido que vincular mi cuenta de github con Codeship, crear un nuevo proyecto en Codeship en el que especifico el repositorio de mi proyecto de CC en Github y por último configuro el deployment en Heroku desde codeship de ese repositorio cada vez que se le haga push, dandole el nombre de nuestra app creada en heroku y nuestra api key como podemos ver en la captura a continuación:

![Captura Codeship](img/codeship_heroku.png "Conexion heroku y codeship")


Así mismo Codeship se encarga de realizar también los tests pertinentes antes de que se realize el despliege en Heroku.

Para configurar esto, en la pestaña de Codeship de Test he especificado los comandos necesarios para el despliege y en test pipeline he especificado que ejecute "npm test" para que así se pasen los test que especifiqué en el archivo test.js.

Por último, he creado un archivo .travis.yml en el que también compruebo estos test, pero no realizo el despliege desde este ya que esto se hace automáticamente con Codeship.

