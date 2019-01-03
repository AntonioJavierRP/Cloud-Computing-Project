#!/bin/bash

# Creación del grupo de recursos.

echo "Creación del grupo de recursos."
az group create -l ukwest -n UKrecGroup


# Creación de la Máquina virtual

echo "Creación de la MV"
az vm create -g UKrecGroup -n PlanificacionDeportiva --nsg-rule ssh --image Canonical:UbuntuServer:16.04-LTS:latest --size Standard_B1s --public-ip-address-allocation static --admin-username usuario-azure


# Abrir Puerto 80

echo "Abrir Puerto 80"
az vm open-port --resource-group UKrecGroup --name PlanificacionDeportiva --port 80
