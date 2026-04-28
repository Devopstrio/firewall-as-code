provider "azurerm" {
  features {}
}

# --- Firewall as Code Foundation (Institutional Hub) ---

resource "azurerm_resource_group" "fwac" {
  name     = "rg-${var.project_name}-foundation-${var.environment}"
  location = var.location
}

# --- Central Security Hub VNET ---

resource "azurerm_virtual_network" "hub" {
  name                = "vnet-${var.project_name}-security-hub-${var.environment}"
  location            = azurerm_resource_group.fwac.location
  resource_group_name = azurerm_resource_group.fwac.name
  address_space       = ["10.200.0.0/16"]

  tags = {
    Environment = var.environment
    CostCenter  = "Core-Security"
  }
}

# --- Institutional Azure Firewall ---

resource "azurerm_public_ip" "fw" {
  name                = "pip-${var.project_name}-firewall-${var.environment}"
  location            = azurerm_resource_group.fwac.location
  resource_group_name = azurerm_resource_group.fwac.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_firewall" "fw" {
  name                = "fw-${var.project_name}-perimeter-${var.environment}"
  location            = azurerm_resource_group.fwac.location
  resource_group_name = azurerm_resource_group.fwac.name
  sku_name            = "AZFW_VNet"
  sku_tier            = "Premium"

  ip_configuration {
    name                 = "configuration"
    subnet_id            = azurerm_subnet.fw_subnet.id
    public_ip_address_id = azurerm_public_ip.fw.id
  }
}

# --- Dedicated Firewall Subnet ---

resource "azurerm_subnet" "fw_subnet" {
  name                 = "AzureFirewallSubnet"
  resource_group_name  = azurerm_resource_group.fwac.name
  virtual_network_name = azurerm_virtual_network.hub.name
  address_prefixes     = ["10.200.0.0/24"]
}

# --- Security Policy Metadata Store (Postgres) ---

resource "azurerm_postgresql_flexible_server" "fwac" {
  name                   = "psql-${var.project_name}-policy-store-${var.environment}"
  resource_group_name    = azurerm_resource_group.fwac.name
  location               = azurerm_resource_group.fwac.location
  version                = "13"
  administrator_login    = "fwacadmin"
  administrator_password = var.db_password
  storage_mb             = 32768
  sku_name               = "GP_Standard_D2ds_v4"
}
