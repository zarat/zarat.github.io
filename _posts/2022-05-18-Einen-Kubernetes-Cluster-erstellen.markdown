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
sudo kubeadm init --apiserver-advertise-address [master-node-ip] --pod-network-cidr=[internal pod network cidr]
</pre>

Am Ende der Ausgabe des letzte Befehls werden weitere Schritte zum Anlegen der Konfiguration und die API Token zum Hinzufügen weiterer Worker-Nodes ausgegeben.

Man erstellt als regulärer Benutzer eine Konfiguration für kubectl.

<pre>
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
</pre>

Der Befehl zum Hinzufügen von Worker-Nodes wird im Format

<pre>
kubeadm join <control-plane-host>:<control-plane-port> --token <token> --discovery-token-ca-cert-hash sha256:<hash>
</pre>

ausgegeben.

Zuletzt fügen wir noch eine Networking API zu unserem Cluster hinzu.

<pre>
sudo kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
</pre>

<h3>Folgende Schritte auf allen Worker Nodes ausführen</h3>

Den Befehl zum Hinzufügen der Worker-Nodes welcher bei der Initialisierung des Clusters ausgegeben wurde wird nun auf jedem außer auf dem Master-Node ausgeführt.

<pre>
kubeadm join <control-plane-host>:<control-plane-port> --token <token> --discovery-token-ca-cert-hash sha256:<hash>
</pre>
