---
layout: post
title: Einen Kubernetes Cluster auf Ubuntu 24.04 aufsetzen
author: Manuel Zarat
category: tutorials
tags: cloud automation
permalink: /post/kubernetes-cluster-ubuntu2404
---

In diesem Tutorial setzen wir einen kleinen Kubernetes-Cluster auf, bestehend aus:

  * 1 Control-Plane-Node
  * 2 Worker-Nodes
  * Betriebssystem: Ubuntu 24.04 auf allen Nodes
  * Container-Runtime: containerd

<!--excerpt_separator-->

Die folgenden Schritte werden auf allen Nodes (Control-Plane + Worker) ausgeführt, außer es steht ausdrücklich etwas anderes dabei.

Kubernetes unterstützt keinen aktiven Swap, bzw. erwartet standardmäßig, dass Swap deaktiviert ist. Der Kubernetes-Scheduler und der Linux-Kernel treffen Entscheidungen auf Basis des verfügbaren RAM. 

<pre>
# SWAP temporär deaktivieren
sudo swapoff -a
</pre>

Dieser Befehl deaktiviert Swap sofort, aber nur bis zum nächsten Reboot. Damit Swap nach einem Neustart nicht wieder aktiviert wird, kommentieren wir den Eintrag in der /etc/fstab aus:

<pre>
# aus fstab auskommentieren
sudo sed -ri 's/^\s*([^#].*\s+swap\s+)/# \1/' /etc/fstab
</pre>

Die sed-Zeile sucht nach nicht-auskommentierten "swap" Einträgen und setzt ein # davor.


Kubernetes (bzw. die Container-Runtime und das Networking) benötigt bestimmte Kernel-Module, um Container-Dateisysteme und Netzwerkbrücken korrekt zu verwalten.

  * overlay: Ermöglicht Overlay-Dateisysteme, die von Container-Runtimes wie containerd genutzt werden.
  * br_netfilter: Stellt sicher, dass eingehender/ausgehender Traffic von Bridge-Interfaces (z. B. für Pod-Netzwerke) durch iptables-Regeln verarbeitet werden kann.

Damit die Module dauerhaft geladen werden, legen wir eine Konfigurationsdatei an:

<pre>
echo -e "overlay\nbr_netfilter" | sudo tee /etc/modules-load.d/k8s.conf
sudo modprobe overlay
sudo modprobe br_netfilter
</pre>

Die Datei /etc/modules-load.d/k8s.conf sorgt dafür, dass die Module beim Booten geladen werden.



Kubernetes setzt stark auf virtuelle Netzwerke (Pod-Netze, Service-Netze). Damit Pakete korrekt durch den Kernel geroutet und gefiltert werden, müssen einige sysctl-Parameter gesetzt werden. Wir erstellen dazu eine eigene sysctl-Datei:

<pre>
cat <<'EOF' | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward = 1
EOF

# Änderungen anwenden
sudo sysctl --system
</pre>

Was bedeuten diese Einstellungen?

  * net.bridge.bridge-nf-call-iptables = 1 sorgt dafür, dass Traffic, der über Bridge-Interfaces läuft (z. B. Pod-Netzwerke), durch iptables (also die Linux-Firewall) verarbeitet wird.
  * net.ipv4.ip_forward = 1 aktiviert IP-Forwarding – notwendig, damit der Node als Router zwischen Pod-Netzen und anderen Netzwerken fungieren kann.
  * sudo sysctl --system lädt alle sysctl-Konfigurationsdateien neu und wendet die Werte sofort an.
