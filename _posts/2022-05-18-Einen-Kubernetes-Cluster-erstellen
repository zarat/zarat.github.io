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

Zuerst ist wichtig das jeder Knoten ein Minimum von 2 GB Arbeitsspeicher sowie 2 CPU und eine statische IP verfügt. Swap muss auf allen Knoten deaktiviert sein da es unter Umständen die Isolierung beeinträchtigen kann. 
Ausserdem muss jeder Knoten über die gleiche <code>/etc/hosts</code> Datei verfügen in der alle Knoten aufgelistet sind.

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
