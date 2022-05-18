---
layout: post
title: Einen Kubernetes Cluster unter Ubuntu erstellen
author: Manuel Zarat
categories: tutorials
tags: cloud-computing
permalink: /post/kubernetes-cluster
---

Kubernetes ist eine kostenlose Alternative zu Docker Swarm um einen Docker-Cluster zu automatisieren.

<!--excerpt_separator-->

Zuerst ist wichtig das jeder Knoten ein Minimum von 2 GB Arbeitsspeicher sowie 2 CPU und eine statische IP verfügt. Ausserdem muss jeder Knoten über die gleiche <code>/etc/hosts</code> Datei verfügen in der alle Knoten aufgelistet sind. Swap muss auf allen Knoten deaktiviert sein da es unter Umständen die Isolierung beeinträchtigen kann. 

<h3>Folgende Schritte auf allen Knoten ausführen</h3>

Zuerst das Swap deaktivieren

<pre>
swapoff -a
</pre>

Der Befehl <code>free -m</code> sollte nun keinen verwendeten Auslagerungsspeicher mehr zeigen.

<pre>
apt update && apt install apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
apt-add-repository "deb http://apt.kubernetes.io/ kubernetes-xenial main"
apt update && apt install -y kubelet kubeadm kubectl docker.io
</pre>

Nun kann der Cluster initialisiert werden.

<pre>
sudo kubeadm init --apiserver-advertise-address <master-node-ip> --pod-network-cidr=<internal pod network cidr>
</pre>

Am Ende der Ausgabe des letzte Befehls werden weitere Schritte und die API Token zum Hinzufügen weiterer Worker-Nodes ausgegeben.

<pre>
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a Pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  /docs/concepts/cluster-administration/addons/

You can now join any number of machines by running the following on each node
as root:

  kubeadm join <control-plane-host>:<control-plane-port> --token <token> --discovery-token-ca-cert-hash sha256:<hash>
</pre>

<h3>Folgende Schritte auf allen Worker Nodes ausführen</h3>

