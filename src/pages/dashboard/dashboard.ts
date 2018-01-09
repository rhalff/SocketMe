import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';
import { Config } from '../../app/services/config.service';
import { SocketService } from '../../app/services/socket.service';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  public config;
  public connections = [
    {
      text: 'RobbertHalff.com',
      url: 'https://robberthalff.com',
      path: '/ws',
      connect: false
    },
    {
      text: 'RobbertHalff (dev)',
      url: 'http://localhost:3000',
     // path: '/ws',
      connect: false
    },
    {
      text: '192.168.1.124 (dev)',
      url: 'http://192.168.1.124:3000',
      // path: '/ws',
      connect: false
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _log: Logger,
    private _socket: SocketService,
    config: Config
  ) {
    this.config = config.socket
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  findByUrl (url) {
    return this.connections.find(function (_conn) {
      return _conn.url === url
    })
  }

  toggleIt(socket) {
    if (socket.connect) {
      this._log.info('Connecting to socket')
      const opts = socket.path ? {path: socket.path} : {}
      this._socket.connect(socket.url, opts)
    } else {
      this._log.info('Disconnecting from socket')
      this._socket.disconnect(socket.url)
    }
  }

  /*
  $scope.$watch('config.frequency', function (val) {
    $timeout(function () {
      SocketMe.setInterval(val)
    })
  })

  $scope.$on('socket:status', function (ev, data) {
    $timeout(function () {
      const conn = findByUrl(data.url)
      conn.status = data.status
    })
  })
  */
}
