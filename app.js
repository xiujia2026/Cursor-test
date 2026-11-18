(function () {
  const site = window.SITE;
  if (!site) return;

  const text = (value) => document.createTextNode(value ?? "");
  const el = (tag, className, children = []) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    for (const child of children) {
      if (child == null || child === false) continue;
      node.appendChild(typeof child === "string" ? text(child) : child);
    }
    return node;
  };

  document.getElementById("brand-name").textContent = site.name;
  document.getElementById("hero-name").textContent = site.name;
  document.getElementById("hero-tagline").textContent = site.tagline;
  document.getElementById("hero-location").textContent = site.location;
  document.title = site.name;
  document.getElementById("footer-copy").textContent =
    "© " + new Date().getFullYear() + " " + site.name + " · Personal site";

  const about = document.getElementById("about-copy");
  for (const paragraph of site.about || []) {
    about.appendChild(el("p", null, [paragraph]));
  }

  const fillTimeline = (containerId, items, mapItem) => {
    const root = document.getElementById(containerId);
    for (const item of items || []) {
      root.appendChild(mapItem(item));
    }
  };

  fillTimeline("research-list", site.research, (item) => {
    const points = el(
      "ul",
      null,
      (item.points || []).map((point) => el("li", null, [point]))
    );
    return el("article", "entry", [
      el("div", "entry-meta", [
        el("h3", null, [item.title]),
        el("span", "dates", [item.dates])
      ]),
      points
    ]);
  });

  fillTimeline("leadership-list", site.leadership, (item) => {
    const points = el(
      "ul",
      null,
      (item.points || []).map((point) => el("li", null, [point]))
    );
    return el("article", "entry", [
      el("div", "entry-meta", [
        el("h3", null, [item.role]),
        el("span", "dates", [item.dates])
      ]),
      points
    ]);
  });

  fillTimeline("education-list", site.education, (item) =>
    el("article", "entry", [
      el("div", "entry-meta", [
        el("h3", null, [item.school]),
        el("span", "place", [item.place]),
        el("span", "dates", [item.dates])
      ]),
      el("p", "degree", [item.degree])
    ])
  );

  const pubs = document.getElementById("publications-list");
  for (const pub of site.publications || []) {
    pubs.appendChild(
      el("li", null, [
        el("p", "pub-title", [pub.title]),
        el("p", "pub-authors", [pub.authors]),
        pub.venue ? el("p", "pub-venue", [pub.venue]) : null
      ])
    );
  }

  const honors = document.getElementById("honors-list");
  for (const honor of site.honors || []) {
    honors.appendChild(
      el("li", null, [
        el("p", "honor-name", [honor.name]),
        el("p", "honor-year", [honor.year])
      ])
    );
  }

  const skills = document.getElementById("skills-grid");
  for (const block of site.knowledge || []) {
    skills.appendChild(
      el("div", "skill-block", [
        el("h3", null, [block.label]),
        el(
          "ul",
          null,
          (block.items || []).map((item) => el("li", null, [item]))
        )
      ])
    );
  }

  const langs = document.getElementById("lang-row");
  if (site.languages?.toefl) {
    langs.appendChild(el("span", "lang-chip", [site.languages.toefl]));
  }
  if (site.languages?.native) {
    langs.appendChild(el("span", "lang-chip", [site.languages.native]));
  }

  const contact = document.getElementById("contact-panel");
  if (site.email) {
    const mail = el("a", null, [site.email]);
    mail.href = "mailto:" + site.email;
    contact.appendChild(mail);
  }
  if (site.phone) {
    const phone = el("a", null, [site.phone]);
    phone.href = "tel:" + site.phone.replace(/[^\d+]/g, "");
    contact.appendChild(phone);
  }
  contact.appendChild(
    el("p", "contact-note", [
      "Based in " + (site.location || "Hong Kong") + "."
    ])
  );

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();
