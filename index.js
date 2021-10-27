const { listContacts,
    getContactById,
    removeContact,
    addContact } = require("./contacts");

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

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