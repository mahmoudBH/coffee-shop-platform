import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBars, FaTimes, FaTachometerAlt, FaClipboardList, FaCoffee, FaCog, 
  FaBoxOpen, FaUsers, FaCalendarCheck, FaChevronDown, FaChevronUp, FaCalendarAlt,
} from 'react-icons/fa';
import { MdRestaurantMenu } from "react-icons/md";
import { RiMenuFill, RiMenuAddLine } from "react-icons/ri";

const SideList = ({ setIsSidebarOpen, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openSubMenu, setOpenSubMenu] = useState(null); // État pour gérer les sous-menus ouverts

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsSidebarOpen(!isOpen);
  };

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index); // Ouvrir ou fermer le sous-menu
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile && (
        <div style={styles.mobileToggleButton} onClick={toggleSidebar}>
          <FaBars style={styles.iconToggle} />
        </div>
      )}

      <aside style={{
        ...styles.sidebar,
        width: isOpen ? (isMobile ? '100%' : '250px') : '80px',
        transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
        transition: 'transform 0.3s ease-in-out, width 0.4s ease-in-out',
        backgroundColor: isDarkMode ? '#333' : '#d4d4d8',
      }}>
        <div style={styles.headerContainer}>
          <div style={styles.toggleButton} onClick={toggleSidebar}>
            {isOpen ? <FaTimes style={styles.iconToggle} /> : <FaBars style={styles.iconToggle} />}
          </div>

          <div style={styles.logoContainer}>
            <img src="/logo.png" alt="Logo" style={styles.logo} />
          </div>
        </div>

        <ul style={styles.sidebarList}>
          {sidebarData.map((item, index) => (
            <React.Fragment key={index}>
              <li
                style={{
                  ...styles.sidebarItem,
                  backgroundColor: isDarkMode ? '#444' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = `translateX(${isOpen ? '10px' : '5px'})`;
                    e.currentTarget.style.backgroundColor = '#a1a1aa';
                    e.currentTarget.style.boxShadow = '5px 5px 15px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#444' : 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
                onClick={() => item.subItems && toggleSubMenu(index)} // Gestion du clic pour les sous-menus
              >
                <Link to={item.path} style={styles.link}>
                  <div style={styles.iconContainer}>
                    <item.icon style={{ ...styles.icon, color: isDarkMode ? '#fff' : '#000' }} />
                  </div>
                  {isOpen && (
                    <span style={{ ...styles.text, color: isDarkMode ? '#fff' : '#000' }}>
                      {item.label}
                    </span>
                  )}
                </Link>
                {item.subItems && isOpen && (
                  <div style={styles.chevron}>
                    {openSubMenu === index ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                )}
              </li>

              {/* Affichage des sous-éléments */}
              {item.subItems && openSubMenu === index && isOpen && (
                <ul style={styles.subMenu}>
                  {item.subItems.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      style={{
                        ...styles.subMenuItem,
                        backgroundColor: isDarkMode ? '#555' : '#e0e0e0',
                      }}
                      onMouseEnter={(e) => {
                        if (!isMobile) {
                          e.currentTarget.style.transform = `translateX(${isOpen ? '10px' : '5px'})`;
                          e.currentTarget.style.backgroundColor = '#a1a1aa';
                          e.currentTarget.style.boxShadow = '5px 5px 15px rgba(0, 0, 0, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile) {
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.backgroundColor = isDarkMode ? '#555' : '#e0e0e0';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      <Link to={subItem.path} style={styles.link}>
                        <div style={styles.iconContainer}>
                          <subItem.icon style={{ ...styles.icon, color: isDarkMode ? '#fff' : '#000' }} />
                        </div>
                        <span style={{ ...styles.text, color: isDarkMode ? '#fff' : '#000' }}>
                          {subItem.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </aside>
    </div>
  );
};

const sidebarData = [
  { label: 'Dashboard', icon: FaTachometerAlt, path: '/home' },
  { label: 'Commandes', icon: FaClipboardList, path: '/commandes' },
  {
    label: 'Menu',
    icon: MdRestaurantMenu,
    subItems: [
      { label: 'Menu', icon: FaCoffee, path: '/menu' },
      { label: 'Ajouter un Pack', icon: RiMenuAddLine, path: '/pack' },
      { label: 'Liste de Pack', icon: RiMenuFill, path: '/Packlist' },

    ],
  },
  { label: 'Réservations', icon: FaCalendarCheck, path: '/reservations',
    subItems: [
      { label: 'Les Tables', icon: FaBoxOpen, path: '/tables' },]
   },
  { label: 'Événements', icon: FaCalendarAlt, path: '/evenements' },
  {
    label: 'Stocks',
    icon: FaBoxOpen,
    subItems: [
      { label: 'Mes Stocks', icon: FaBoxOpen, path: '/stock' },
      { label: 'Gérer mes Stocks', icon: FaCog, path: '/stock/stock-manager' },
    ],
  },
  { label: 'Clients', icon: FaUsers, path: '/clients' },
  
];

const styles = {
  sidebar: {
    height: '100vh',
    padding: '20px 10px',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    overflowX: 'hidden',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    backgroundColor: '#f4f4f4',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  toggleButton: {
    fontSize: '30px',
    color: '#000000',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  mobileToggleButton: {
    fontSize: '30px',
    color: '#000000',
    cursor: 'pointer',
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 1000,
  },
  iconToggle: {
    transition: 'transform 0.3s ease',
  },
  logoContainer: {
    textAlign: 'center',
  },
  logo: {
    width: '100px',
    height: 'auto',
  },
  sidebarList: {
    listStyle: 'none',
    padding: 0,
    width: '100%',
    marginTop: '-5px',
  },
  sidebarItem: {
    padding: '15px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    borderRadius: '5px',
    transition: 'all 0.2s ease-in-out', // Transition plus rapide
    transform: 'translateX(0)',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  iconContainer: {
    minWidth: '40px',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
  },
  icon: {
    fontSize: '22px',
    transition: 'transform 0.3s ease-in-out, color 0.3s ease',
  },
  text: {
    marginLeft: '10px',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'opacity 0.3s ease',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    textDecoration: 'none',
  },
  subMenu: {
    listStyle: 'none',
    padding: 0,
    width: '91%',
    marginTop: '5px', // Espace entre l'élément parent et les sous-éléments
    marginLeft: '20px', // Décalage pour les sous-éléments
  },
  subMenuItem: {
    padding: '10px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    borderRadius: '5px',
    transition: 'all 0.2s ease-in-out', // Transition plus rapide
  },
  chevron: {
    marginLeft: 'auto',
    fontSize: '14px',
    color: '#fff',
  },
};

export default SideList;