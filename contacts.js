// contacts.js
const { v4 } = require("uuid");

const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => String(item.id) === contactId);
    if(idx === -1) {
        return null;
    }
    return contacts[idx];
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item=>String(item.id) === contactId);
    if(idx === -1) {
        return null;
    }
    contacts.splice(idx, 1);
    await refreshContacts(contacts);
    return true;
}
 
async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    contacts.push(newContact);
    await refreshContacts(contacts);  
    return contacts;
}

const refreshContacts = async (contactsToFile) => {
    const newContact = await fs.writeFile(contactsPath, JSON.stringify(contactsToFile));    
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};