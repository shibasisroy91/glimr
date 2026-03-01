output "resource_group_name" {
  value       = azurerm_resource_group.glimr_rg.name
  description = "The name of the resource group where Glimr lives."
}

output "acr_login_server" {
  value       = azurerm_container_registry.acr.login_server
  description = "The URL used to log in to the Azure Container Registry"
}

output "acr_admin_username" {
  value       = azurerm_container_registry.acr.admin_username
  description = "The admin username for the ACR"
}

output "aks_cluster_name" {
  value       = azurerm_kubernetes_cluster.aks.name
  description = "The name of the Kubernates cluster"
}

output "aks_get_credentials_command" {
  value       = "az aks get-credentials --resource-group ${azurerm_resource_group.glimr_rg.name} --name ${azurerm_kubernetes_cluster.aks.name}"
  description = "Run this command on your Mac to connect kubectl to your new cluster."
}
