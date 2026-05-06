const fs = require('fs');
const path = require('path');

function replaceInDir(dir, replacements) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath, replacements);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            for (const {from, to} of replacements) {
                content = content.split(from).join(to);
            }
            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated: ' + fullPath);
            }
        }
    }
}

const adminReplacements = [
    { from: 'http://localhost:4000/api/auth/login', to: 'http://localhost:4000/api/auth/admin/login' }, // Fix the manual edit
    { from: 'http://localhost:5000/api/login', to: 'http://localhost:4000/api/auth/admin/login' },
    { from: 'http://localhost:5000/api/profile/update/email', to: 'http://localhost:4000/api/users/admin/profile/update/email' },
    { from: 'http://localhost:5000/api/profile/update/password', to: 'http://localhost:4000/api/users/admin/profile/update/password' },
    { from: 'http://localhost:5000/api/profile', to: 'http://localhost:4000/api/users/admin/profile' },
    { from: 'http://localhost:5000/api/tables', to: 'http://localhost:4000/api/events/tables' }, // Assuming tables is under events
    { from: 'http://localhost:5000/api/capacity', to: 'http://localhost:4000/api/events/capacity' }, // Assuming capacity is under events
    { from: 'http://localhost:5000/api/', to: 'http://localhost:4000/api/' },
    { from: 'http://localhost:5000/uploads/', to: 'http://localhost:4000/uploads/' }
];

const clientReplacements = [
    { from: 'http://localhost:4000/login', to: 'http://localhost:4000/api/auth/client/login' },
    { from: 'http://localhost:4000/signup', to: 'http://localhost:4000/api/auth/client/signup' },
    { from: 'http://localhost:4000/logout', to: 'http://localhost:4000/api/auth/client/logout' },
    { from: 'http://localhost:4000/profile', to: 'http://localhost:4000/api/users/profile' },
    { from: 'http://localhost:4000/change-password', to: 'http://localhost:4000/api/users/change-password' },
    { from: 'http://localhost:4000/reservation', to: 'http://localhost:4000/api/reservations' }
];

replaceInDir('c:/Users/mahmo/OneDrive/Bureau/coffe/admin-coffee/admin-coffee/src', adminReplacements);
replaceInDir('c:/Users/mahmo/OneDrive/Bureau/coffe/frontend/src', clientReplacements);
console.log('Terminé !');
