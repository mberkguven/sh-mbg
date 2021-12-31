var app = new Vue({
  el: "#app",
  data: {
    show_inputplayers: true,
    show_roles: false,
    show_rolecard: false,
    show_flip: false,
    show_main: false,

    show_fascist_5_6: false,
    show_fascist_7_8: false,
    show_fascist_9_10: false,

    num_players: "",
    num_liberal: "",
    num_fascist: "",

    player_roles: [],
    role_list: [],

    current_player: 0,
    role: "",
    roles_showed_all: false,
  },

  methods: {
    start_5: function () {
      this.num_players = 5;
      this.determine_players();
    },
    start_6: function () {
      this.num_players = 6;
      this.determine_players();
    },
    start_7: function () {
      this.num_players = 7;
      this.determine_players();
    },
    start_8: function () {
      this.num_players = 8;
      this.determine_players();
    },
    start_9: function () {
      this.num_players = 9;
      this.determine_players();
    },
    start_10: function () {
      this.num_players = 10;
      this.determine_players();
    },

    determine_players: function () {
      if (this.num_players >= 5 && this.num_players <= 10) {
        this.num_players = Math.floor(this.num_players);
        this.show_roles = true;
        this.show_flip = true;
        this.show_inputplayers = false;

        this.num_liberal = Math.round(this.num_players * 0.6);
        this.num_fascist = this.num_players - this.num_liberal - 1;

        this.role_list = ["Hitler"];
        for (i = 0; i < this.num_liberal; i++) {
          this.role_list.push("Liberal");
        }
        for (i = 0; i < this.num_fascist; i++) {
          this.role_list.push("Fascist");
        }

        for (i = 0; i < this.num_players; i++) {
          r = Math.floor(Math.random() * (this.num_players - i));
          this.player_roles.push(this.role_list[r]);
          this.role_list.splice(r, 1);
        }

        this.role = this.player_roles[this.current_player];

        if (this.num_players == 5 || this.num_players == 6) {
          this.show_fascist_5_6 = true;
        } else if (this.num_players == 7 || this.num_players == 8) {
          this.show_fascist_7_8 = true;
        } else if (this.num_players == 9 || this.num_players == 10) {
          this.show_fascist_9_10 = true;
        }
      }
    },

    next_role: function () {
      if (this.current_player == this.num_players) {
        this.show_roles = false;
        this.show_flip = false;
        this.show_main = true;
        let heilSound = document.getElementById("heilSound");
        heilSound.play();
      } else {
        this.show_flip = true;
      }
      this.show_rolecard = false;
    },

    flip: function () {
      this.role = this.player_roles[this.current_player];
      this.current_player += 1;
      this.show_rolecard = true;
      this.show_flip = false;
      let cardFlipSound = document.getElementById("cardFlip");
      cardFlipSound.play();
    },

    show_allplayers: function () {
      if (this.roles_showed_all === false) {
        if (confirm("Oyuncuların kimliğini görmek istediğine emin misin?")) {
          const list = document.getElementById("player-list");
          this.player_roles.forEach((element) => {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(element));
            list.appendChild(li);
          });
          this.roles_showed_all = true;
        }
      } else {
        alert("Roller zaten gösteriliyor, sarhoş musun?");
      }
    },
  },
});
