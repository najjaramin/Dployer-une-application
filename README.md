# Dployer-une-application

Ce dépôt regroupe les travaux pratiques (TP1, TP2, TP3) réalisés dans le cadre du cours de DevOps & Cloud.

## 📚 Sommaire des TP

### [TP1 : Déploiement avec Ansible (IaC)](./tp1)
**Objectif** : Automatiser le déploiement d'une application avec Ansible (Infrastructure as Code).
*   Utilisation de rôles Ansible pour Node.js, Nginx et PM2.
*   Gestion des configurations via des templates Jinja2.
*   Approche "Infrastructure as Code" (reproductibilité).

### [TP2 : Coolify + Forgejo (PaaS auto-hébergé)](./tp2)
**Objectif** : Déployer une application Next.js via une alternative open-source à Vercel/Netlify.
*   Installation de Coolify (PaaS) et Forgejo (Git auto-hébergé) dans une VM.
*   Déploiement continu via Webhook (git push → redéploiement).
*   Configuration d'un nom d'hôte local (`portfolio.coolify.local`).

### [TP3 : CI/CD avec GitHub Actions et Render (Cloud)](https://github.com/najjaramin/cicd-lab)
**Objectif** : Mettre en place un pipeline CI/CD complet sur le cloud.
*   **CI** : GitHub Actions (tests, typecheck, build obligatoires avant merge).
*   **CD** : Déploiement sur Render conditionné par le succès des tests.
*   Gestion des branches et Pull Requests avec protection de la branche `main`.
*   [Lien vers le dépôt dédié au TP3](https://github.com/najjaramin/cicd-lab.git)

## 🏗️ Conclusion générale

| TP | Approche | Outil | Points forts |
| :--- | :--- | :--- | :--- |
| **TP1** | Infrastructure as Code (IaC) | Ansible | Reproductibilité, maîtrise totale du serveur. |
| **TP2** | Platform as a Service (PaaS) | Coolify + Forgejo | Interface graphique simple, auto-hébergé, gratuit. |
| **TP3** | CI/CD managé | GitHub Actions + Render | Qualité du code garantie, déploiement cloud automatisé. |

Ces trois TP m'ont permis de couvrir le spectre du déploiement moderne : de la gestion manuelle d'un serveur avec Ansible (TP1) à l'automatisation complète avec tests et déploiement cloud (TP3), en passant par une solution intermédiaire auto-hébergée (TP2).
