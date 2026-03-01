resource "azurerm_resource_group" "glimr_rg" {
  name     = "rg-glimr-dev"
  location = "Central India"
}

resource "azurerm_container_registry" "acr" {
  name                = "glimracr"
  resource_group_name = azurerm_resource_group.glimr_rg.name
  location            = azurerm_resource_group.glimr_rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "glimr-aks-cluster"
  location            = azurerm_resource_group.glimr_rg.location
  resource_group_name = azurerm_resource_group.glimr_rg.name
  dns_prefix          = "glimr-k8s"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_B2s"
  }

  identity {
    type = "SystemAssigned"
  }
}
