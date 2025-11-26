fetch("header.html")
      .then(res => res.text())
      .then(html => {
        document.querySelector("header").innerHTML = html;
      })
      .catch(err => console.error("Header Load Error:", err));