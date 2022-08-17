<script>

import GoogleSheets from '@/components/GoogleSheets.vue'

let id = 0

export default {
  name: 'kimagure-app',
  components: {
    GoogleSheets
  },
  data() {
    return {
      orderId: '',
      grandtotal: 0,
      menuChoices: [
        { id: id++, item: '木まぐれ サンバル バーガー', quantity: 0, unitcost: 500, totalcost: 0 },
        { id: id++, item: 'ポテト・唐揚げ・ナゲット', quantity: 0, unitcost: 350, totalcost: 0 },
        { id: id++, item: '薬膳梨スイーツ', quantity: 0, unitcost: 400, totalcost: 0 },
        { id: id++, item: '梨付きかき氷', quantity: 0, unitcost: 300, totalcost: 0 },
      ]
    }
  },
  /*
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.done)
        : this.todos
    }
  },
  */
  methods: {
    setOrderId() {
      this.orderId = new Date().toJSON().slice(0,19).replace(/-/g,'').replace(/:/g,'');
    },
    increment(menuItem) {
      menuItem.quantity++;
      menuItem.totalcost = menuItem.quantity * menuItem.unitcost;
      this.grandtotal += menuItem.unitcost;
    },
    reduce(menuItem) {
      if (menuItem.quantity > 0) {
        menuItem.quantity--;
        menuItem.totalcost = menuItem.quantity * menuItem.unitcost;
        this.grandtotal -= menuItem.unitcost;
      }
    },
    reset() {
      this.menuChoices[0].quantity=0;
      this.menuChoices[0].totalcost=0;
      this.menuChoices[1].quantity=0;
      this.menuChoices[1].totalcost=0;
      this.menuChoices[2].quantity=0;
      this.menuChoices[2].totalcost=0;
      this.menuChoices[3].quantity=0;
      this.menuChoices[3].totalcost=0;
      this.grandtotal=0;
      this.setOrderId();
    }
    /*
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    }
    */
  },
  mounted() {
    this.setOrderId();
  }
}
</script>

<template>
  <div>
    <img alt="木まぐれKOPITIAM" src="./assets/kimagure-kopitiam.png" width="200">
    <p style="font-size: 28px;">木まぐれKOPITIAM 注文アプリ</p>
    <p style="font-size: 12px;">注文番号: {{ orderId }}</p>
    <table align="center" border=0 width="480">
      <tr style="background: lightgreen">
        <th>項目</th>
        <th>価格</th>
        <th colspan="2">個数</th>
        <th>小計</th>
      </tr>
      <tr v-for="menuItem in menuChoices" :key="menuItem.id">
        <td><button @click="increment(menuItem)">{{ menuItem.item }}</button></td>
        <td>{{ menuItem.unitcost }}</td>
        <td>{{ menuItem.quantity }}</td>
        <td><button @click="reduce(menuItem)">ー</button></td>
        <td>{{ menuItem.totalcost }}</td>
      </tr>
    </table>
    <hr>
    <p style="font-size: 40px;">合計： {{ this.grandtotal }}</p>
    <p><GoogleSheets :orderId="orderId" :menuChoices="menuChoices" /></p> 

<!--
    <br><br><br><br><br><br>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo">
      <button>Add Todo</button>
    </form>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.done">
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>
    <button @click="hideCompleted = !hideCompleted">
      {{ hideCompleted ? 'Show all' : 'Hide completed' }}
    </button>
-->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
td, th {
  padding: 10px;
}
</style>