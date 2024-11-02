provider "google" {
  credentials = file("${var.credentials_file_path}")
  project     = var.project_id
  region      = var.region
}

resource "google_compute_instance" "default" {
  name         = "vm-instance"
  machine_type = "f1-micro"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  network_interface {
    network = "default"
    access_config {
    }
  }
}

variable "credentials_file_path" {}
variable "project_id" {}
variable "region" {}
