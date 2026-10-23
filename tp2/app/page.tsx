export default function Home() {
  return (
    <main className="portfolio">
      <nav className="navbar">
        <a href="#" className="logo">AN<span>.</span></a>
        <div className="nav-links">
          <a href="#about">À propos</a>
          <a href="#skills">Compétences</a>
          <a href="#projects">Projets</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="about">
        <p className="eyebrow">PORTFOLIO · DEVOPS & CLOUD</p>
        <h1>Bonjour, moi c’est <span>Amin Najjar.</span></h1>
        <p className="description">
          Étudiant en Master DevOps, passionné par l’automatisation,
          le Cloud, Linux et le déploiement d’applications.
        </p>
        <div className="actions">
          <a className="button primary" href="#projects">Voir mes projets</a>
          <a className="button secondary" href="https://github.com/najjaramin"
             target="_blank" rel="noreferrer">Mon GitHub ↗</a>
        </div>
        <div className="status"><span /> Disponible pour apprendre et collaborer</div>
      </section>

      <section className="section" id="skills">
        <p className="eyebrow">MES TECHNOLOGIES</p>
        <h2>Compétences</h2>
        <div className="skills">
          {["Linux", "Git & GitHub", "Docker", "Kubernetes", "Jenkins",
            "Ansible", "Terraform", "CI/CD", "Zabbix & Grafana"].map(skill => (
            <span className="skill" key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <p className="eyebrow">CE QUE JE CONSTRUIS</p>
        <h2>Projets</h2>
        <div className="projects">
          <article className="project">
            <span className="project-number">01 / SUPERVISION</span>
            <h3>Supervision des infrastructures IT</h3>
            <p>Projet PFE autour de Zabbix, Grafana, SNMP et VPN pour superviser des infrastructures IT.</p>
            <div className="tags">Zabbix · Grafana · SNMP</div>
          </article>
          <article className="project">
            <span className="project-number">02 / CI-CD</span>
            <h3>Automatisation du déploiement</h3>
            <p>Pratique de pipelines CI/CD, tests automatisés et déploiement d’applications avec Docker et Jenkins.</p>
            <div className="tags">Docker · Jenkins · CI/CD</div>
          </article>
          <article className="project">
            <span className="project-number">03 / CLOUD</span>
            <h3>Portfolio DevOps</h3>
            <p>Site Next.js déployé avec Coolify et Forgejo pour pratiquer le déploiement continu.</p>
            <div className="tags">Next.js · Forgejo · Coolify</div>
          </article>
        </div>
      </section>

      <section className="section contact" id="contact">
        <p className="eyebrow">ON RESTE EN CONTACT</p>
        <h2>Construisons quelque chose ensemble.</h2>
        <p>Tu as une opportunité ou un projet DevOps ? Contacte-moi.</p>

        <div className="contact-details">
          <p>
            <strong>Email :</strong>{" "}
            <a href="mailto:TON_EMAIL_ICI">aminnajjar3@gmail.com</a>
          </p>
          <p>
            <strong>Téléphone :</strong>{" "}
            <a href="tel:TON_NUMERO_ICI">+21623975681</a>
          </p>
        </div>

        <div className="actions">
          <a className="button primary" href="mailto:TON_EMAIL_ICI">
            M’envoyer un email ↗
          </a>
          <a className="button secondary"
             href="https://github.com/najjaramin"
             target="_blank" rel="noreferrer">
            Mon GitHub ↗
          </a>
        </div>
      </section>

      <footer>© 2026 Amin Najjar · Portfolio DevOps</footer>
    </main>
  );
}
