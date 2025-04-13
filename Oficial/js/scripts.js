document.addEventListener("DOMContentLoaded", () => {
  // Toggle dropdown menus
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation()
      const dropdown = this.nextElementSibling
      const isVisible = dropdown.style.display === "block"

      // Close all dropdowns
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.style.display = "none"
      })

      // Toggle current dropdown
      if (!isVisible) {
        dropdown.style.display = "block"
      }
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.style.display = "none"
    })
  })

  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn")
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")
      const tabContainer = this.closest(".tabs")

      // Deactivate all tabs
      tabContainer.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("active")
      })
      tabContainer.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active")
      })

      // Activate selected tab
      this.classList.add("active")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle")
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const mobileMenu = document.createElement("div")
      mobileMenu.className = "mobile-menu"
      mobileMenu.innerHTML = `
                <div class="mobile-menu-header">
                    <div class="logo-link">
                        <div class="logo-circle">CE</div>
                        <span class="logo-text">Controle de Endemias</span>
                    </div>
                    <button class="close-menu">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <nav class="mobile-nav">
                    <a href="dashboard.html">Dashboard</a>
                    <a href="mapa.html">Mapa</a>
                    <a href="visitas.html">Minhas Visitas</a>
                    <a href="boletins.html">Boletins</a>
                </nav>
                <div class="mobile-menu-footer">
                    <a href="index.html" class="btn btn-outline btn-block">
                        <i class="fas fa-sign-out-alt"></i> Sair
                    </a>
                </div>
            `

      document.body.appendChild(mobileMenu)
      document.body.style.overflow = "hidden"

      // Add styles for mobile menu
      const style = document.createElement("style")
      style.textContent = `
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                }
                .mobile-menu-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem;
                    border-bottom: 1px solid var(--gray-200);
                }
                .close-menu {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--gray-600);
                    cursor: pointer;
                }
                .mobile-nav {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    padding: 1rem;
                }
                .mobile-nav a {
                    padding: 1rem;
                    font-size: 1.125rem;
                    font-weight: 500;
                    color: var(--gray-700);
                    text-decoration: none;
                    border-bottom: 1px solid var(--gray-100);
                }
                .mobile-menu-footer {
                    padding: 1rem;
                    border-top: 1px solid var(--gray-200);
                }
            `
      document.head.appendChild(style)

      // Close mobile menu
      document.querySelector(".close-menu").addEventListener("click", () => {
        document.body.removeChild(mobileMenu)
        document.body.style.overflow = ""
      })
    })
  }

  // Offline detection and sync functionality
  window.addEventListener("online", updateOnlineStatus)
  window.addEventListener("offline", updateOnlineStatus)

  function updateOnlineStatus() {
    const syncButton = document.querySelector(".sync-info .btn")
    if (syncButton) {
      if (navigator.onLine) {
        syncButton.disabled = false
        syncButton.innerHTML = '<i class="fas fa-check-circle"></i> Sincronizar'

        // Show sync notification
        showNotification("Conexão restabelecida. Clique em Sincronizar para enviar os dados.", "info")
      } else {
        syncButton.disabled = true
        syncButton.innerHTML = '<i class="fas fa-times-circle"></i> Offline'

        // Show offline notification
        showNotification("Você está offline. Os dados serão salvos localmente.", "warning")
      }
    }
  }

  // Sync button functionality
  const syncButton = document.querySelector(".sync-info .btn")
  if (syncButton) {
    syncButton.addEventListener("click", function () {
      if (navigator.onLine) {
        // Simulate sync process
        this.disabled = true
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sincronizando...'

        setTimeout(() => {
          this.disabled = false
          this.innerHTML = '<i class="fas fa-check-circle"></i> Sincronizar'

          // Update sync time
          const now = new Date()
          const timeStr =
            now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0")
          document.querySelector(".sync-time").innerHTML =
            '<i class="fas fa-clock"></i> Última sincronização: ' + timeStr

          // Show success notification
          showNotification("Dados sincronizados com sucesso!", "success")
        }, 2000)
      }
    })
  }

  // Form submission in visita.html
  const visitaForm = document.querySelector(".footer-bar .btn-primary")
  if (visitaForm) {
    visitaForm.addEventListener("click", function () {
      // Simulate form submission
      this.disabled = true
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...'

      setTimeout(() => {
        // Redirect to dashboard
        window.location.href = "dashboard.html"
      }, 1500)
    })
  }

  // Initialize current tab based on URL
  function initCurrentTab() {
    const currentPage = window.location.pathname.split("/").pop()
    const navLinks = document.querySelectorAll(".main-nav a")

    navLinks.forEach((link) => {
      const linkPage = link.getAttribute("href")
      if (linkPage === currentPage) {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
  }

  initCurrentTab()

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getIconForType(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `

    // Add styles for notification
    const style = document.createElement("style")
    style.textContent = `
            .notification {
                position: fixed;
                bottom: 1rem;
                right: 1rem;
                padding: 0.75rem 1rem;
                background-color: #fff;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index: 1000;
                min-width: 300px;
                max-width: 400px;
                animation: slideIn 0.3s ease-out;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .notification-success {
                border-left: 4px solid var(--success);
            }
            .notification-info {
                border-left: 4px solid var(--info);
            }
            .notification-warning {
                border-left: 4px solid var(--warning);
            }
            .notification-danger {
                border-left: 4px solid var(--danger);
            }
            .notification-close {
                background: none;
                border: none;
                color: var(--gray-500);
                cursor: pointer;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `
    document.head.appendChild(style)

    document.body.appendChild(notification)

    // Close notification
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => {
      notification.style.animation = "slideOut 0.3s ease-out forwards"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    })

    // Auto close after 5 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.animation = "slideOut 0.3s ease-out forwards"
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification)
          }
        }, 300)
      }
    }, 5000)
  }

  function getIconForType(type) {
    switch (type) {
      case "success":
        return "fa-check-circle"
      case "info":
        return "fa-info-circle"
      case "warning":
        return "fa-exclamation-triangle"
      case "danger":
        return "fa-exclamation-circle"
      default:
        return "fa-info-circle"
    }
  }

  // Local storage for offline data
  function saveFormData(formId, data) {
    const storedData = JSON.parse(localStorage.getItem("endemias_offline_data") || "{}")
    storedData[formId] = data
    localStorage.setItem("endemias_offline_data", JSON.stringify(storedData))
  }

  function getFormData(formId) {
    const storedData = JSON.parse(localStorage.getItem("endemias_offline_data") || "{}")
    return storedData[formId] || null
  }

  // Save draft button functionality
  const saveDraftBtn = document.querySelector(".sub-header-actions .btn-outline")
  if (saveDraftBtn && saveDraftBtn.textContent.includes("Salvar Rascunho")) {
    saveDraftBtn.addEventListener("click", () => {
      // Collect form data
      const formData = {
        tipoImovel: document.getElementById("tipo-imovel")?.value,
        situacao: document.querySelector('input[name="situacao"]:checked')?.value,
        quintal: Array.from(document.querySelectorAll('input[name="quintal[]"]:checked')).map((el) => el.value),
        caixadagua: document.querySelector('input[name="caixadagua"]:checked')?.value,
        // Add more fields as needed
      }

      // Save to local storage
      saveFormData("visita_" + new Date().getTime(), formData)

      // Show notification
      showNotification("Rascunho salvo com sucesso!", "success")
    })
  }
})
