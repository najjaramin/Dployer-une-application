# TP1 — Déploiement d'un portfolio Next.js avec Ansible et Semaphore UI

## 1. Objectif
Automatiser le déploiement d'un portfolio Next.js avec Ansible, Semaphore UI, GitHub et Ubuntu Server.

**État actuel :** le template Semaphore est sauvegardé, mais le déploiement réel n'a pas encore été lancé.

## 2. Environnement

| Élément | Valeur |
|---|---|
| Serveur Ubuntu | `192.168.30.167` |
| Utilisateur SSH | `amin` |
| Dossier Ansible | `~/portfolio-deploy` |
| Semaphore UI | `http://192.168.30.167:3002` |
| Conteneur Semaphore | `semaphore-ui` |
| Repository Ansible | `https://github.com/najjaramin/D-ployer-une-application.git` |
| Repository application | `https://github.com/najjaramin/myCV.git` |
| Dossier Next.js | `my-cv-next/` |
| Branche | `main` |

## 3. Configuration Semaphore

- Projet : `Portfolio Deployment`
- Repository : `Demo`
- Template : `Deploy Portfolio`
- Playbook : `site.yml`
- Inventory : `portfolio-inventory`
- Executor image : valeur par défaut
- Survey Variables et CLI args : vides
- Conteneur Semaphore : `semaphoreui/semaphore:v2.19.12`
- Logs : `Server is running`

### Inventaire prévu

```ini
[portfolio]
192.168.30.167 ansible_user=amin ansible_python_interpreter=/usr/bin/python3

cd ~/portfolio-deploy

cat > README.md <<'EOF'
# TP1 — Déploiement d'un portfolio Next.js avec Ansible et Semaphore UI

## 1. Objectif

Automatiser le déploiement d'un portfolio Next.js avec Ansible, Semaphore UI, GitHub et Ubuntu Server.

**État actuel :** le template Semaphore est sauvegardé, mais le déploiement réel n'a pas encore été lancé.

## 2. Environnement

| Élément | Valeur |
|---|---|
| Serveur Ubuntu | `192.168.30.167` |
| Utilisateur SSH | `amin` |
| Dossier Ansible | `~/portfolio-deploy` |
| Semaphore UI | `http://192.168.30.167:3002` |
| Conteneur Semaphore | `semaphore-ui` |
| Dépôt Ansible | `https://github.com/najjaramin/D-ployer-une-application.git` |
| Dépôt application | `https://github.com/najjaramin/myCV.git` |
| Dossier Next.js | `my-cv-next/` |
| Branche | `main` |

**Remarque :** vérifier l'URL exacte du dépôt Ansible dans GitHub.

## 3. Configuration Semaphore UI

- Projet : `Portfolio Deployment`
- Repository : `Demo`
- Template : `Deploy Portfolio`
- Playbook : `site.yml`
- Inventory : `portfolio-inventory`
- Executor image : valeur par défaut
- Survey Variables : vide
- CLI args : vide
- Image Semaphore : `semaphoreui/semaphore:v2.19.12`
- État des logs : `Server is running`

### Inventaire prévu

```ini
[portfolio]
192.168.30.167 ansible_user=amin ansible_python_interpreter=/usr/bin/python3
```

Dans Semaphore, sélectionner `portfolio-ssh-key` dans **User Credentials**. Laisser **Sudo Credentials** vide pour le moment.

## 4. Structure du projet Ansible

```text
portfolio-deploy/
├── ansible.cfg
├── group_vars/
│   └── all.yml
├── inventory/
│   └── hosts.ini
├── roles/
│   ├── app/
│   ├── common/
│   ├── nginx/
│   └── nodejs/
└── site.yml
```

### Fichier `site.yml`

```yaml
---
- name: Deploy Next.js portfolio
  hosts: portfolio
  become: true
  gather_facts: true

  roles:
    - common
    - nodejs
    - app
    - nginx
```

### Fichier `ansible.cfg`

```ini
[defaults]
inventory = ./inventory/hosts.ini
roles_path = ./roles
host_key_checking = True
retry_files_enabled = False
```

### Fichier `inventory/hosts.ini`

```ini
[portfolio]
localhost ansible_connection=local
```

### Fichier `group_vars/all.yml`

```yaml
app_repo: "https://github.com/najjaramin/myCV.git"
app_version: "main"
app_dir: "/opt/portfolio"
app_port: 3000
server_name: "_"
deploy_user: "deploy"
nodejs_major_version: "22"
```

Le test `ansible-playbook site.yml --syntax-check` a réussi précédemment.

## 5. Points à corriger avant le déploiement

### Application Next.js

L'application se trouve dans `my-cv-next/`, et non à la racine du dépôt `myCV`.

Il faut adapter le rôle `app` pour exécuter `npm ci` et `npm run build` dans le bon dossier.

### SSH

La clé `~/.ssh/semaphore_ed25519` permet une connexion SSH, mais demande une passphrase. Le fichier `~/.ssh/semaphore_nopass` n'existe pas.

**Sécurité :** une clé privée a été partagée dans le chat. Il faut la considérer comme compromise, créer une nouvelle clé dédiée, remplacer l'ancienne dans Semaphore et retirer l'ancienne clé publique de `authorized_keys`. Ne jamais publier une clé privée dans GitHub ou dans le chat.

### Sudo

La commande `sudo -n whoami` a retourné :

```text
sudo: interactive authentication is required
```

Il faut configurer et tester une méthode sudo adaptée à Ansible avant le déploiement.

### Nginx et services existants

Le rôle Nginx semble désactiver le site par défaut et créer un `default_server` sur le port 80. Il faut vérifier son contenu avant de l'exécuter.

Services déjà observés sur le serveur :

- `portfolio-frontend` : port hôte `3001`
- `portfolio-api` : port hôte `4001`
- `garderie-frontend` : port hôte `3000`
- `garderie-backend` : port hôte `4000`
- `cv-portfolio` : port hôte `8081`
- `cv-portfolio-compose` : port hôte `8082`
- Jenkins : probablement port hôte `8080`

Ne pas arrêter ni modifier ces services sans vérification.

## 6. Progression du projet

- [x] Projet Semaphore `Portfolio Deployment` créé.
- [x] Repository `Demo` ajouté ; URL exacte à vérifier.
- [x] Template `Deploy Portfolio` sauvegardé.
- [x] Playbook `site.yml` créé.
- [x] Test de syntaxe Ansible réussi précédemment.
- [x] Connexion SSH testée avec une clé protégée par passphrase.
- [ ] Confirmer que `portfolio-inventory` est enregistré avec la bonne clé.
- [ ] Créer une nouvelle clé SSH et remplacer l'ancienne exposée.
- [ ] Tester la connexion SSH depuis Semaphore.
- [ ] Configurer une méthode sudo sûre.
- [ ] Corriger le chemin de build Next.js.
- [ ] Vérifier le rôle Nginx.
- [ ] Effectuer un test Ansible non destructif.
- [ ] Lancer le déploiement après validation.

## 7. Enregistrer le README dans GitHub

Après avoir créé le fichier :

```bash
git status
git add README.md
git commit -m "docs: add deployment progress README"
git push origin main
```

Ne jamais enregistrer de mot de passe, token ou clé privée dans Git.
