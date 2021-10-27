const { listContacts,
    getContactById,
    removeContact,
    addContact } = require("./contacts");


// index.js

const argv = require('yargs').argv;

// ===using Hidebin===
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
// const { argv } = yargs(hideBin(process.argv));

//console.log('argv:', hideBin(process.argv));

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case 'list':
        const contacts = await listContacts();
        console.table(contacts);
        break;
  
      case 'get':
        const contact = await getContactById(id);
        if (!contact){
            throw new Error(`Contact: id=${id} was not found`);
        }
        console.log(contact);
        break;
  
      case 'add':
        await addContact(name, email, phone);
        console.log("Successfully added");
        break;
  
      case 'remove':
        const result = await removeContact(id);
        if (!result){
            throw new Error(`Contact: id=${id} was not found`);
        }
        console.log("Successfully removed");
        break;
      
      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  }
  
  invokeAction(argv);