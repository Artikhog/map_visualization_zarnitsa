const blue_box_img_src = "./src/img/blue_box.png"
const green_box_img_src = "./src/img/green_box.png"
const red_box_img_src = "./src/img/red_box.png"
const orange_box_img_src = "./src/img/orange_box.png"
const yellow_box_img_src = "./src/img/yellow_box.png"
const directory_path = "./src/img/"

class InformationPanel{
    constructor() {
        this.player_panels = []
    }
    add_panels(blue_players_data, red_players_data) {
        const blue_players_data_array = Object.values(blue_players_data)
        const red_players_data_array = Object.values(red_players_data)
        for (let i = 0; i < 4; i++) {
            this.player_panels.push(new Player_Panel('blue', i))
        }
        for (let i = 0; i < 4; i++) {
            this.player_panels.push(new Player_Panel('red', i))
        }
    }
    update_panels(blue_players_data, red_players_data) {
        const blue_players_data_array = Object.values(blue_players_data)
        const red_players_data_array = Object.values(red_players_data)
        for (let i = 0; i < 4; i++) {
            this.player_panels[i].set_data(blue_players_data_array[i])
        }
        for (let i = 0; i < 4; i++) {
            this.player_panels[i+4].set_data(red_players_data_array[i])
        }
    }
}

class Player_Panel{
    constructor(team_color, number) {
        this.player_div = document.getElementsByClassName(`${team_color}_player_div`)[number]
        this.team_color = team_color;
        this.number = number;
        this.points =  this.player_div.getElementsByClassName('player_balls')[0]
        this.drone_image = this.player_div.getElementsByClassName('drone_img')[0]
        this.box_image = this.player_div.getElementsByClassName('box_img')[0]
        this.bullet_image_array = this.player_div.getElementsByClassName('bullet_img')
        this.repair_marker = this.player_div.getElementsByClassName('repair_marker')[0]
    }
    set_data(player_data) {
        this.points.innerText = `Баллы: ${player_data.balls}`;
        this.set_drone(player_data.name_object_controll, player_data.is_connected);
        this.set_bullet(player_data.bullet);
        this.set_box(player_data.color_cargo, player_data.is_cargo);
        this.set_repair(player_data.repair, player_data.is_connected)
    }
    set_drone(type, is_connected) {
        if (is_connected) {
            switch (type) {
                case 'TestObject':
                    this.drone_image.src = `${directory_path}${this.team_color}_drone.png`
                    break;
                case 'EduBotObject':
                    this.drone_image.src = `${directory_path}${this.team_color}_car.png`
                    break;
                case 'PioneerObject':
                    this.drone_image.src = `${directory_path}${this.team_color}_drone.png`
                    break;
            }
        } else {
            switch (type) {
                case 'TestObject':
                    this.drone_image.src = `${directory_path}blocked_drone.png`
                    break;
                case 'EduBotObject':
                    this.drone_image.src = `${directory_path}blocked_car.png`
                    break;
                case 'PioneerObject':
                    this.drone_image.src = `${directory_path}blocked_drone.png`
                    break;
            }
        }
    }
    set_bullet(bullet_number) {
        for (let i = 0; i < bullet_number; i++) {
            this.bullet_image_array[i].style.display = "marker";
        }
        for (let i = bullet_number; i < 3; i++) {
            this.bullet_image_array[i].style.display = "none";
        }
    }
    set_box(box_color_array, is_cargo) {
        if (is_cargo) {
            this.box_image.src = `${directory_path}${rgb_parser(box_color_array)}_box.png`
            this.box_image.style.display = "block";
        }
        else {
            this.box_image.style.display = "none";
        }
        console.log(is_cargo)
    }
    set_repair(is_repair, is_connected) {
        console.log(is_repair, is_connected)
        if (is_repair) {
            this.player_div.style.background = 'rgba(0, 0, 0, 0.5)';
            this.player_div.style.border = '4px solid rgba(0, 0, 0, 0.25)';
            this.repair_marker.style.display = 'block';
            this.repair_marker.innerHTML = 'В ремонте';
        }
        else if (!is_connected) {
            this.player_div.style.background = 'rgba(0, 0, 0, 0.5)';
            this.player_div.style.border = '4px solid rgba(0, 0, 0, 0.25)';
            this.repair_marker.style.display = 'block';
            this.repair_marker.innerHTML = 'Нет соединения';
        } else if (this.team_color === 'red') {
            this.player_div.style.background = 'rgba(255, 0, 0, 0.5)';
            this.player_div.style.border = '4px solid #FF0000';
            this.repair_marker.style.display = 'none';
        } else if (this.team_color === 'blue') {
            this.player_div.style.background = 'rgba(0, 0, 251, 0.5)';
            this.player_div.style.border = '4px solid #5000FF';
            this.repair_marker.style.display = 'none';
        }
    }
}
