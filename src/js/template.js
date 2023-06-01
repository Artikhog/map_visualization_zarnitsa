// const DataUrl = "http://127.0.0.1:5555/?target=get&type_command=player&command=visualization&param=0"
const DataUrl = "http://10.10.33.15:31222/?target=get&type_command=player&command=visualization&param=0"
// const DataUrl = "https://arena.geoscan.aero/game?target=get&type_command=player&command=visualization&param=0"
function start() {
    resize_map();

    var canvas = document.getElementById('map_canvas');
    var stage = new createjs.Stage(canvas);
    add_ticker(stage, 60);
    var map = new Map(canvas, stage, canvas.height);

    var info_panel = new InformationPanel()



    get_objects(map, info_panel);
    get_info(map, info_panel);
    map.update();


    setInterval(function () {
        get_info(map, info_panel);
        map.update();
    }, 100);

    window.addEventListener('resize', () => {
        resize_map();
    })
}

function get_info(map, info_panel) {
    fetch(DataUrl).then(response =>
        response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {

            const team_value = Object.values(res.data.team_info)
            const polygon_value = Object.values(res.data.polygon_info)

            document.getElementById('blue_team_balls').innerText = `Баллы: ${team_value[0].balls_team}`
            document.getElementById('red_team_balls').innerText = `Баллы: ${team_value[1].balls_team}`
            document.getElementById('time').innerText = res.data.server_info.gameTime

                map.parse_data(team_value[0].players, team_value[1].players, polygon_value);
            info_panel.update_panels(team_value[0].players, team_value[1].players)
        }).catch(function (e) {
            console.log(e)
        }));
}

function get_objects(map, info_panel) {
    fetch(DataUrl).then(response =>
        response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {

            const team_value = Object.values(res.data.team_info)
            map.add_moving_objects(team_value[0].players, team_value[1].players);
            map.add_polygon_objects(res.data.polygon_info);
            info_panel.add_panels(team_value[0].players, team_value[1].players)
        }).catch(function (e) {
            console.log(e)
        }));
}


function resize_map() {
    const height = window.innerHeight;
    const width = window.innerWidth;
    var map_div = document.getElementById('map_canvas')
    var size = 0.8 * (height + width) / 3
    map_div.width = size;
    map_div.height = size;
    map_div.style.width = size+"px";
    map_div.style.height = size+"px";
    map_div.style.left = (width - size)/2+"px";

    // map_canvas.style.width = size+"px";
    // map_canvas.style.height = size+"px";
}
