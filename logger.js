'use strict'
const {createLogger, format, transports} = require('winston');
const fs = require('fs');
const path = require('path');
const winstonRotator = require('winston-daily-rotate-file')         // Para crear un archivo de log nuevo cada dia.

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Creamos el directorio de log si no existe
if( !fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
}


const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/Ejecucion-%DATE%.log`,
    datePattern: 'DD-MM-YYYY',
    format: format.combine(
        format.json(),
        format.printf(
            info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
        )
    )
});

/*
const filename = path.join(logDir, 'results.log');
*/

const logger = createLogger({
    // Muestra más mensajes de log en el archivo que en consola.
    level: env === 'development' ? 'debug' : 'info',
    format: format.combine(
        format.label({label: path.basename(module.parent.filename)}),       // Para saber de donde viene el mensaje
        format.timestamp({
            format: 'HH:mm DD-MM-YYYY '
        }),
        format.json()
        ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
                )
            )
        }),
        dailyRotateFileTransport
    ]
});



module.exports = logger;