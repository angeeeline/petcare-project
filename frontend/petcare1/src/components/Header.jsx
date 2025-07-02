import React, { useState, useEffect } from 'react';
import {
  Button,
  Grow,
  ClickAwayListener,
  Popper,
  Paper,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
  Modal,
  Divider,
  MenuList,
  MenuItem
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import AppointmentForm from '../components/AppointmentForm';
import logo from '/src/assets/fetch_and_fur_logo1.png';

const Header = () => {
  const navigate = useNavigate();

  // UI states
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [exploreAnchor, setExploreAnchor] = useState(null);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);

  const notifications = [
    { id: 1, text: 'Appointment confirmed with Dr. Kim', time: '2h ago', icon: '🐶' },
    { id: 2, text: 'Your pet product has shipped!', time: '5h ago', icon: '📦' },
    { id: 3, text: 'New article: Pet Health & Wellness', time: '1d ago', icon: '📰' }
  ];

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    };

    checkUser();
    window.addEventListener('storageChange', checkUser);
    return () => window.removeEventListener('storageChange', checkUser);
  }, []);

  const handleNotifClick = (e) => {
    setNotifAnchor(e.currentTarget);
    setShowNotif((prev) => !prev);
  };
  const handleNotifClose = () => setShowNotif(false);

  const handleExploreClick = (e) => setExploreAnchor(e.currentTarget);
  const handleExploreClose = () => setExploreAnchor(null);

  const handleProfileClick = (event) => {
    setProfileAnchor(profileAnchor ? null : event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('petOwner');
    window.dispatchEvent(new Event('storageChange'));
    navigate('/');
  };

  const goTo = (path) => {
    handleExploreClose();
    navigate(path);
  };

  return (
    <>
      <header className="header">
        <nav className="nav">
          {/* LEFT NAV */}
          <ul className="nav-links">
            <li>
              <Button onClick={handleExploreClick} variant="text" color="inherit">Explore</Button>
              <Popper
                open={Boolean(exploreAnchor)}
                anchorEl={exploreAnchor}
                placement="bottom-start"
                transition
                style={{ zIndex: 1300 }}
              >
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper
                      onMouseLeave={handleExploreClose}
                      sx={{
                        mt: 1,
                        display: 'flex',
                        gap: 4,
                        p: 2,
                        borderRadius: 2,
                        border: '1px solid #ddd',
                        backgroundColor: '#fff',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        minWidth: 400
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1 }} color="textSecondary">SERVICES</Typography>
                        <List dense>
                          <ListItem button onClick={() => goTo('/adoption')}><ListItemText primary="Adopt a Pet" /></ListItem>
                          <ListItem button onClick={() => goTo('/treatments')}><ListItemText primary="Treatment List" /></ListItem>
                          <ListItem button onClick={() => goTo('/veterinarians')}><ListItemText primary="Veterinarians" /></ListItem>
                        </List>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1 }} color="textSecondary">STORE SHORTCUTS</Typography>
                        <List dense>
                          <ListItem button onClick={() => goTo('/cart')}><ListItemText primary="View Cart" /></ListItem>
                          <ListItem button onClick={() => goTo('/wishlist')}><ListItemText primary="Wishlist" /></ListItem>
                        </List>
                      </Box>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </li>
            <li><Button onClick={() => navigate('/shop')} variant="text" color="inherit">Products</Button></li>
            <li><Button onClick={() => navigate('/about')} variant="text" color="inherit">About</Button></li>
            <li><Button onClick={() => setAppointmentOpen(true)} variant="text" color="inherit">Book Now</Button></li>
          </ul>

          {/* LOGO */}
          <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src={logo} width={200} height={50} alt="Logo" />
          </div>

          {/* RIGHT NAV */}
          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button
              variant="text"
              color="inherit"
              size="small"
              onClick={() => alert('💬 Chat with our support: support@fetchfur.com')}
              startIcon={<SupportAgentIcon fontSize="small" />}
              sx={{ minWidth: 'auto', fontSize: '0.8rem', padding: '4px 8px' }}
            >
              Support
            </Button>

            {!isLoggedIn ? (
              <Button
                onClick={() => navigate('/login')}
                variant="outlined"
                size="small"
                sx={{ fontSize: '0.8rem', padding: '4px 12px' }}
              >
                Sign in
              </Button>
            ) : (
              <ClickAwayListener onClickAway={handleNotifClose}>
                <div>
                  <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon
                      onClick={handleNotifClick}
                      fontSize="small"
                      style={{ cursor: 'pointer', color: '#555' }}
                    />
                  </Badge>
                  <Popper
                    open={showNotif}
                    anchorEl={notifAnchor}
                    placement="bottom-end"
                    transition
                    style={{ zIndex: 1300 }}
                  >
                    {({ TransitionProps }) => (
                      <Grow {...TransitionProps}>
                        <Paper
                          elevation={4}
                          sx={{
                            mt: 1,
                            width: 350,
                            borderRadius: '12px',
                            backgroundColor: '#fff',
                            border: '1px solid #e0e0e0',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                          }}
                        >
                          <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #eee' }}>
                            <Typography variant="subtitle1" fontWeight="bold">Notifications</Typography>
                          </Box>
                          <List dense disablePadding>
                            {notifications.map((notif) => (
                              <ListItem
                                key={notif.id}
                                alignItems="flex-start"
                                sx={{
                                  px: 2,
                                  py: 1.5,
                                  '&:hover': {
                                    backgroundColor: '#f9f9f9',
                                    cursor: 'pointer',
                                  },
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar sx={{ fontSize: '1.2rem', bgcolor: '#fdd835', color: '#333' }}>
                                    {notif.icon}
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={<Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>{notif.text}</Typography>}
                                  secondary={<Typography variant="caption" color="text.secondary">{notif.time}</Typography>}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </ClickAwayListener>
            )}

            {/* Profile Icon with Dropdown */}
            <div
              className="profile-icon"
              onClick={handleProfileClick}
              style={{
                cursor: 'pointer',
                marginLeft: '4px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#fdd835',
              }}
            />
            <Popper
              open={Boolean(profileAnchor)}
              anchorEl={profileAnchor}
              role={undefined}
              placement="bottom-end"
              transition
              disablePortal
              style={{ zIndex: 1300 }}
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper
                    sx={{
                      mt: 1,
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                      overflow: 'hidden',
                      minWidth: 200
                    }}
                  >
                    <ClickAwayListener onClickAway={() => setProfileAnchor(null)}>
                      <MenuList dense>
                        {isLoggedIn ? (
                          <>
                            <MenuItem
                              onClick={() => {
                                setProfileAnchor(null);
                                navigate('/profile');
                              }}
                            >
                              Manage Profile
                            </MenuItem>
                            <Divider />
                            <MenuItem
                              onClick={() => {
                                setProfileAnchor(null);
                                handleLogout();
                              }}
                            >
                              Logout
                            </MenuItem>
                          </>
                        ) : (
                          <MenuItem disabled>
                            <Typography variant="body2" color="textSecondary">
                              Login or Sign up to visit your profile.
                            </Typography>
                          </MenuItem>
                        )}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </nav>
      </header>

      {/* Appointment Modal */}
      <Modal open={appointmentOpen} onClose={() => setAppointmentOpen(false)}>
        <Box className="appointment-wrapper">
          <AppointmentForm
            onClose={() => setAppointmentOpen(false)}
            onSuccess={() => {
              setAppointmentOpen(false);
              navigate('/profile');
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Header;
