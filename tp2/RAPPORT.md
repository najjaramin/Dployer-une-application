# Rapport TP2 : Déploiement d'un Portfolio Next.js avec Coolify et Forgejo

## 1. Tableau comparatif : PaaS (Coolify) vs IaC (Ansible - TP1)

| Critère | Approche PaaS (Coolify - TP2) | Approche IaC (Ansible - TP1) |
| :--- | :--- | :--- |
| **Mise en place** | Très rapide, via un script bash et une interface web. | Plus longue, nécessite l'écriture de playbooks YAML. |
| **Gestion du proxy** | Automatique (Traefik intégré). | Manuelle (configuration Nginx dans les templates). |
| **Déploiement applicatif** | Automatique via webhook (Git push). | Manuel (exécution de `ansible-playbook`). |
| **Courbe d'apprentissage** | Faible (interface graphique intuitive). | Moyenne (maîtrise de YAML et des modules Ansible). |
| **Reproductibilité** | Moyenne (dépend de l'état de l'instance). | Très élevée (le code décrit exactement l'infra). |
| **Gestion des secrets** | Via l'interface web de Coolify. | Via Ansible Vault (ou variables d'environnement). |

## 2. Difficultés rencontrées et solutions

- **Fichier hosts sous Windows** : Blocage des droits d'écriture sur `C:\Windows\System32\drivers\etc\hosts`. Résolu en utilisant PowerShell en mode administrateur avec la commande `Add-Content`.
- **Authentification Forgejo** : Échec du `git push` avec le mot de passe classique. Résolu en générant un jeton d'accès personnel (PAT) et en configurant `git config --global credential.helper store`.
- **Détection de l'application par Nixpacks** : Le `package.json` n'était pas à la racine du dépôt Forgejo (dossier `tp2`). Résolu en supprimant et recréant le dépôt proprement, puis en poussant le code à la racine.
- **Build Next.js 16 + Tailwind v4** : Échec de compilation dû à la version de Node (résolu avec `.nvmrc` → Node 22) et au binaire natif de Tailwind (résolu en ajoutant `lightningcss-linux-x64-gnu` aux dépendances).
- **Erreur de rendu Next.js (`new Date()`)** : Next.js 16 refuse de figer la date lors du prerendering. Résolu en remplaçant `new Date().getFullYear()` par l'année en dur (`2026`) dans le footer.

## 3. Architecture du déploiement

- **Forgejo** (port 3001) : Héberge le dépôt Git `portfolio`. Un webhook est configuré pour notifier Coolify à chaque `git push`.
- **Coolify** (port 8000) : Clone le dépôt, compile l'application avec Nixpacks (Node 22), et expose le site via Traefik.
- **Traefik** (port 80) : Fait le routage HTTP basé sur le nom d'hôte `portfolio.coolify.local` (configuré dans le fichier `hosts` de la machine physique).

## 4. Captures d'écran

Toutes les captures sont disponibles dans le dossier `screenshot/` :
- `coolify-dashboard.png`
- `forgejo-repo.png`
- `coolify-config.png`
- `coolify-deploy.png`
- `portfolio.png`
- `forgejo-webhook.png`
- `coolify-autodeploy.png`
- `coolify-deploy-rolback.png` (Rollback)
