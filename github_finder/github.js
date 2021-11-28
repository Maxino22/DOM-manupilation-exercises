class GitHub {
	constructor() {
		this.client_id = '0ad14a81d9ff99a4c7f6';
		this.client_secret = '64d4a15762c9597658f6d056820262f01f85977a';
		this.repos_count = 5;
		this.repos_sort = 'created: asc';
	}
	async getUser(user) {
		const profileResponse = await fetch(
			`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
		);

		const reposResponse = await fetch(
			`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
		);

		//

		//${user}?client_id=${this.client_id}&client_secret=${this.client_secret

		const profile = await profileResponse.json();
		const repos = await reposResponse.json();

		return {
			profile,
			repos,
		};
	}
}
