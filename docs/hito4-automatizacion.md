# Hito 4. Automatización de la creación de Máquinas Virtuales desde línea de órdenes.


MV2: mv.servicioclo.ud


En este hito nos hemos centrado en la creación de máquinas virtuales desde la línea de órdenes para poder realizar su provisionamiento de forma más rápida y en serie...



Uso Azure Cli 2.0 porque ya hemos estado trabajando con Azure en hitos anteriores y contamos con créditos en esta plataforma. Ademas de que es una de las mas utilizadas y cuenta con un amplio abanico de opciones de región, imágenes preparadas y planes de tamaño de máquina.

Para crear una máquina virtual con la linea de ordenes usando Azure Cli 2.0 en primer lugar lo instalamos con apt con: 

        $ sudo apt-get install azure-cli

Una vez instalado iniciamos sesión con azure login y estaremos listos para usar Azure Cli.

Para crear una máquina virtual debemos de elegir la región en la que se alojará, la  imagen del SO que usará , un "publisher"(?) y un tamaño de máquina (memoria, cores y almacenamiento).


En primer lugar vamos a decidirnos por una región.

### Región

Tal y como explican en su [página oficial](https://azure.microsoft.com/en-us/global-infrastructure/regions/) Azure es el proveedor de servicios en la Nube que cuenta con más regiones globales, por lo que tenemos una gran cantidad de opciones de las que elegir.

Lo primero que se tendría que considerar a la hora de elegir una región en la que se desplegará la MV es de donde son la mayoría de los usuarios de nuestra aplicación, ya que de nada sirve que nosotros tengamos un acceso rápido al sistema si nuestros usuarios principales tienen una latencia que hace imposible que usen el sistema de forma eficaz. 
De todas formas para nuestro caso consideramos que la mayoría de los usuarios de la aplicación estarán en España, y consideraré que mi latencia será similar a la de éstos usuarios.

Para determinar mi latencia en cada una de las regiones ofrecidas usaré la página de [Azure Speed Test 2.0](http://azurespeedtest.azurewebsites.net/) recomendad en la guía:
https://www.appliedi.net/blog/which-azure-region-is-the-best/

La página de Azure Speed Test nos devuelve los siguientes resultados:

![SpeedTest](img/h4/speedtest.png "Azure Speed Test 2.0")

Como se puede observar "France Central" es la que nos ofrece la mejor latencia con diferencia. Aún así, nos quedaremos también con "West UK" para las comprobaciones posteriores, ya que diferentes regiones ofrecen diferentes imágenes de Sistemas Operativos y diferentes costes, por lo que no podemos dejar que la latencia sea el único factor decisivo.


### Sistema Operativo.

Para visualizar la imágenes que tenemos disponibles localmente en azure podemos usar la siguiente orden:

~~~~
az vm image list
~~~~

Esto nos devuelve la información relativa a las imágenes disponibles en formato JSON:

~~~~json
[
  {
    "offer": "CentOS",
    "publisher": "OpenLogic",
    "sku": "7.5",
    "urn": "OpenLogic:CentOS:7.5:latest",
    "urnAlias": "CentOS",
    "version": "latest"
  },
  {
    "offer": "CoreOS",
    "publisher": "CoreOS",
    "sku": "Stable",
    "urn": "CoreOS:CoreOS:Stable:latest",
    "urnAlias": "CoreOS",
    "version": "latest"
  },
  {
    "offer": "Debian",
    "publisher": "credativ",
    "sku": "8",
    "urn": "credativ:Debian:8:latest",
    "urnAlias": "Debian",
    "version": "latest"
  },
  {
    "offer": "openSUSE-Leap",
    "publisher": "SUSE",
    "sku": "42.3",
    "urn": "SUSE:openSUSE-Leap:42.3:latest",
    "urnAlias": "openSUSE-Leap",
    "version": "latest"
  },
  {
    "offer": "RHEL",
    "publisher": "RedHat",
    "sku": "7-RAW",
    "urn": "RedHat:RHEL:7-RAW:latest",
    "urnAlias": "RHEL",
    "version": "latest"
  },
  {
    "offer": "SLES",
    "publisher": "SUSE",
    "sku": "12-SP2",
    "urn": "SUSE:SLES:12-SP2:latest",
    "urnAlias": "SLES",
    "version": "latest"
  },
  {
    "offer": "UbuntuServer",
    "publisher": "Canonical",
    "sku": "16.04-LTS",
    "urn": "Canonical:UbuntuServer:16.04-LTS:latest",
    "urnAlias": "UbuntuLTS",
    "version": "latest"
  },
  {
    "offer": "WindowsServer",
    "publisher": "MicrosoftWindowsServer",
    "sku": "2019-Datacenter",
    "urn": "MicrosoftWindowsServer:WindowsServer:2019-Datacenter:latest",
    "urnAlias": "Win2019Datacenter",
    "version": "latest"
  },
  {
    "offer": "WindowsServer",
    "publisher": "MicrosoftWindowsServer",
    "sku": "2016-Datacenter",
    "urn": "MicrosoftWindowsServer:WindowsServer:2016-Datacenter:latest",
    "urnAlias": "Win2016Datacenter",
    "version": "latest"
  },
  {
    "offer": "WindowsServer",
    "publisher": "MicrosoftWindowsServer",
    "sku": "2012-R2-Datacenter",
    "urn": "MicrosoftWindowsServer:WindowsServer:2012-R2-Datacenter:latest",
    "urnAlias": "Win2012R2Datacenter",
    "version": "latest"
  },
  {
    "offer": "WindowsServer",
    "publisher": "MicrosoftWindowsServer",
    "sku": "2012-Datacenter",
    "urn": "MicrosoftWindowsServer:WindowsServer:2012-Datacenter:latest",
    "urnAlias": "Win2012Datacenter",
    "version": "latest"
  },
  {
    "offer": "WindowsServer",
    "publisher": "MicrosoftWindowsServer",
    "sku": "2008-R2-SP1",
    "urn": "MicrosoftWindowsServer:WindowsServer:2008-R2-SP1:latest",
    "urnAlias": "Win2008R2SP1",
    "version": "latest"
  }
]

~~~~


No solo disponemos de estas imágenes, esto solo es una lista disponible offline, podemos acceder a la lista completa con la opción "--all", aunque esto ofrece una lista tan grande que nos conviene filtrarla un poco antes de realizar la búsqueda,por ejemplo, en caso de querer visualizar todas las imágenes que hay disponibles para la región de Francia Central y que contengan el nombre "Ubuntu" podemos usar la siguiente orden:

~~~~
az vm image list --all --location francecentral --output table --offer Ubuntu
~~~~

--output table lo devuelve en una formato más legible en lugar de en JSON.

Esto nos devuelve las siguientes imágenes:

![ImgFR](img/h4/imagenes-francia.png "Imágenes disponibles en Francia de Ubuntu")

Esta captura tan sólo contiene una pequeña parte del total que se nos devuelve(en el caso de la región del Oeste de Reino Unido también obtenemos una lista igual de larga ), por lo que deberíamos de haber filtrado aún más la búsqueda. De todas formas, con esto podemos ver que contamos con un amplio abanico de imágenes posibles en ambas regiones.


Las imágenes que vamos a comparar son :
* Ubuntu Server 18.04, con la siguiente URN: Canonical:UbuntuServer:18.04-LTS:18.04.201812060

* Ubuntu Server 16.04, con la siguiente URN: Canonical:UbuntuServer:16.04-LTS:latest

* Debian 8, con la siguiente URN: credativ:Debian:8:latest

Para ello primero creamos 2 grupos de recursos, uno para Francia central y otro para el Oeste de Reino Unido:

~~~~
az group create -l francecentral -n FRrecGroup

az group create -l ukwest -n UKrecGroup
~~~~

A continuación crearemos 6 máquinas virtuales, ya que comprobaremos las tres imágenes en ambas regiones.

Como todavía no hemos decidido cual es tamaño de máquina virtual óptimo para nuestra aplicación (esto lo elegiremos en el siguiente apartado) usaremos para éstas comprobaciones la opción por defecto: Standard_DS1_v2.

La ordenes que usamos para crear las MVs son las siguientes:

~~~~
$ az vm create -g FRrecGroup -n MV-ub18-FR --nsg-rule ssh --image Canonical:UbuntuServer:18.04-LTS:18.04.201812060

$ az vm create -g FRrecGroup -n MV-ub16-FR --nsg-rule ssh --image Canonical:UbuntuServer:16.04-LTS:latest

$ az vm create -g FRrecGroup -n MV-deb8-FR --nsg-rule ssh --image credativ:Debian:8:latest

$ az vm create -g UKrecGroup -n MV-ub18-UK --nsg-rule ssh --image Canonical:UbuntuServer:18.04-LTS:18.04.201812060

$ az vm create -g UKrecGroup -n MV-ub16-UK --nsg-rule ssh --image Canonical:UbuntuServer:16.04-LTS:latest

$ az vm create -g UKrecGroup -n MV-deb8-UK --nsg-rule ssh --image credativ:Debian:8:latest
~~~~

Medimos cuanto tardan en crearse cada una de las máquinas virtuales con la orden time:

* Francia Central:

  - UB18: 2m 7.650 s

  - UB16: 2m 8.572 s

  - Deb8: 2m 8.987 s

* Oeste Reino Unido:

  - UB18: 2m 7.407 s

  - UB16: 1m 37.513 s

  - Deb8: 2m 7.974 s

Ahora abrimos  el puerto 80 de nuestras MVs con:

~~~~
$ az vm open-port --resource-group <nombredelresourceGroup> --name <nombreMV> --port 80
~~~~

Una vez hecho esto, despliego mi aplicación en cada una de las maquinas virtuales creadas, haciendo uso del Playbook de ansible y modificando los archivos de configuración para que la IP sea la de las MVs y el usuario sea el mismo, para Ubuntu 16 y para Debian se ha tenido que cambiar un poco el Playbook para que instale la última versión de nodejs, ya que no se hace de la misma forma que en Ubuntu 18. El [playbook modificado para Ubuntu 16](https://github.com/AntonioJavierRP/Cloud-Computing-Project/blob/master/provision/playbook-u16.yml) y el [playbook modificado para Debian 8](https://github.com/AntonioJavierRP/Cloud-Computing-Project/blob/master/provision/playbook.deb8.yml) los he añadido a la carpeta provisión del proyecto.


Los tiempos de despliegue(tiempo de ejecución total del Playbook, lo que incluye la instalación de los paquetes necesarios) en cada una de las MVs han sido:

* Francia Central:

  - UB18: 3m 48.958 s

  - UB16: 3m 10.854 s

  - Deb8: 3m 12.736 s

* Oeste Reino Unido:

  - UB18: 3m 11.969 s

  - UB16: 2m 2.137 s

  - Deb8: 2m 53.184 s



Para comparar el rendimiento de las imágenes haremos uso de [Apache Bench](https://httpd.apache.org/docs/2.4/programs/ab.html), para ello tan solo tendremos que instalarlo con:

~~~~
$ sudo apt install apache2-utils
~~~~

Llamaremos a la orden:

~~~~
$ ab -n 5000 -c 500 <ip_publica>/ 
~~~~

Con cada una de las IPs de las máquinas virtuales, esto hará 5000 peticiones a la página principal de nuestra aplicación desplegada en cada MV con un máximo de 500 peticiones realizadas a la vez, tal y como lo hacen en el ejemplo de [ésta página](https://geekflare.com/web-performance-benchmark/). 

Obtenemos los siguientes resultados:

* Francia Central:

  - UB18: 378.91 peticiones por segundo en un tiempo total de 13.196s

    ![abfr1](img/h4/ab-fr1.png "Apache Bench Ubuntu 18 Fr Central")

  - UB16: 541.85 peticiones por segundo en un tiempo total de 9.228s

    ![abfr2](img/h4/ab-fr2.png "Apache Bench Ubuntu 16 Fr Central")

  - Deb8: 505.18 peticiones por segundo en un tiempo total de 9.897s

    ![abfr3](img/h4/ab-fr3.png "Apache Bench Debian 8 Fr Central")

* Oeste Reino Unido:

  - UB18: 420.99 peticiones por segundo en un tiempo total de 11.877s

    ![abuk1](img/h4/ab-uk1.png "Apache Bench Ubuntu 18 Oeste UK")

  - UB16: 568.13 peticiones por segundo en un tiempo total de 8.801s

    ![abuk2](img/h4/ab-uk2.png "Apache Bench Ubuntu 16 Oeste UK")

  - Deb8: 511.79 peticiones por segundo en un tiempo total de 9.770s

    ![abuk3](img/h4/ab-uk3.png "Apache Bench Debian 8 Oeste UK")

### Conclusión.

En base a los resultados que hemos obtenido, vamos a decantarnos por usar la imagen de Ubuntu 16.04 LTS, ya que es la que ha dado los mejores tiempos en todas las pruebas realizadas.
Es la imagen que más rápido se ha creado, en caso de la región del Oeste de Reino Unido. Además, es la que ha conseguido un menor tiempo de despliegue de nuestra aplicación en ambas de las regiones evaluadas. 
Por último, en el caso de los resultados obtenidos mediante Apache Bench tambíen ha sido la mejor en ambas regiones, aunque con resultados muy cercanos a los obtenidos con la imagen de Debian 8.

Dado que los mejores resultados para la imagen elegida se han obtenido en la región del Oeste de Reino Unido, elegiremos ésta región.



## Tamaño

Para visualizar los tamaños disponibles en la región elegida usaremos:

~~~~
$az vm list-sizes -l ukcentral
~~~~


el B1s ya que es el que usamos en la máquina virtual del hito anterior y sabemos que funciona correctamente.

comparar usando 3 tamaños diferentes con ab y si no cambian los resultados usar el B1s por barato o el A1 por mínimo necesario.
Puedo hacerlo también con el tiempo de ejecucion de los tests.



## Script.





## Funcionalidad Añadida.

El avance que se ha hecho con la aplicación durante este hito ha sido la adaptación de las estructuras de clases creadas para que se ajusten en base a los datos climatológicos y para que la API REST devuelva error en caso de que no se cumplan los requisitos de temperatura y clima a la hora de declarar una nueva actividad o modificar una existente.

Para ello he creado una nueva clase TiempoAtm (en el fichero TiempoAtm.js) que contiene los datos climatológicos de cierto día y consta de los siguientes atributos:

* temperaturaDia: temperatura media (en grados Celsius) que hace durante el día del día en concreto (de 6 a.m. a 7 p.m.).
* temperaturaNoche: temperatura media (en grados Celsius) que hace durante la noche del día en concreto (de 8 p.m. a 5 a.m.).
* tiempo: clima del día en concreto, puede ser: soleado, nublado, lluvia, granizo y nieve.

Para la versión actual del proyecto, al no estar todavía comunicados con el microservicio que nos aporta los datos meteorológicos reales, se han tenido que especificar unos datos predeterminados para comprobar que ésta nueva funcionalidad funciona correctamente.
Estos datos los he creado en index.js, y se corresponden a los 7 primeros días del planning, por eso los he llamado tatm1,tatm2,tatm3,tatm4,tatm5,tatm6 y tatm7.

Por último, he modificado los PUT y POST de actividades nuevas, para que tengan en cuenta el tiempo atmosférico especificado, llamando a la función "validateActivityWithData" cada vez que se intente crear o modificar una actividad referente a un día del que se tengan datos meteorológicos.






