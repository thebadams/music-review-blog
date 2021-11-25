import User, {IUser}  from './User';
import Ticket, {ITicket} from './Ticket';
import {Document} from 'mongoose';

describe('User Model', () => {
	let newUser: Document<IUser>;
	let newTicket: Document<ITicket>;
	beforeAll(() => {
		newTicket = new Ticket({seat: 1})
		newUser = new User({
			email: 'test@test.com',
			firstName: 'John',
			lastName: 'Doe',
			facebookId: 'FACEBOOK_ID',
			ticket: newTicket._id
		});
	})
	describe('User Model Properties', () => {
		test('User Should Have an _id Property', () => {
			expect(newUser).toHaveProperty('_id');
		})
		test('User Should have an email Property that is the String "test@test.com"', () => {
			expect(newUser).toHaveProperty('email', 'test@test.com');
		});
		test('User Should Have a firstName Property, that is the string, "John"', () => {
			expect(newUser).toHaveProperty('firstName', 'John');
		})
		test('User Should Have A lastName Property, that is the String, "Doe"', () => {
			expect(newUser).toHaveProperty('lastName', 'Doe');
		})
		test('User Should Have a facebookId property, that is the String "FACEBOOK_ID"', () => {
			expect(newUser).toHaveProperty('facebookId', 'FACEBOOK_ID');
		});
		test('User Should Have a Ticket Property, that references a Ticket', () => {
			expect(newUser).toHaveProperty('ticket', newTicket._id);
		});
	})
})