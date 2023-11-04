export interface IUser {
	name: string;
	email: string;
	password: string;
	phone: string;
	favorites?: {
		[key: string]: boolean,
	};
}
