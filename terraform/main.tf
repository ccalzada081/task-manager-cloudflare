resource "cloudflare_workers_script" "task_manager" {
  account_id = var.account_id
  name       = "task-manager-cloudflare"

  content = file("../src/index.ts")
}
