<template>
    <form @submit.prevent="saveData">
      <!--  {{ this.menuChoices }}  -->
        <button type="submit">注文確定</button>
    </form>
</template>

<script>
    /* eslint-disable no-console */
	const { GoogleSpreadsheet } = require('google-spreadsheet');
	const creds = require('@/client_secret.json');
	export default {
		name: "GoogleSheets",
        props: ['orderId','menuChoices'],
		methods: {
			async saveData() {
                console.log("saveData entered");
				if(confirm("注文を確定しますか？") == false) { return; }
				console.log("Opening Google Spreadsheet");
				const doc = new GoogleSpreadsheet('13AvjKcjdtakog2INyWTIGg8xTpkiD9nusMIJnkyaYL0');
				await doc.useServiceAccountAuth(creds);
				await doc.loadInfo(); 
                console.log(doc.title);
				const sheet = doc.sheetsByIndex[0];
                console.log(sheet.title);
                console.log(sheet.rowCount);

				for (var i = 0; i < this.menuChoices.length; i++) {
					console.log(this.menuChoices[i]);
					const newRow = {
						id: this.orderId,
						item: this.menuChoices[i].item,
						unitCost: this.menuChoices[i].unitcost,
						quantity: this.menuChoices[i].quantity,
						total: this.menuChoices[i].totalcost,
					}
					if (newRow.quantity > 0) {
						await sheet.addRow(newRow);
					}
				}
				this.$parent.reset();
                console.log("saveData ended");
			}
		}
	}
</script>

