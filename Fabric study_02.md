## Hyperledger Fabric 독학 뽀개기

### Hyperledger Fabric 필수 요소

*Ubuntu 18.04.3*

<br>

#### curl

> **$ sudo apt-get install -y curl**
>
> **$ curl -v / --version**
>
> *curl 7.58.0 (x86_64-pc-linux-gnu) libcurl/7.58.0 OpenSSL/1.1.1 zlib/1.2.11 libidn2/2.0.4 libpsl/0.19.1 (+libidn2/2.0.4) nghttp2/1.30.0 librtmp/2.3*
> *Release-Date: 2018-01-24*
> *Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtmp rtsp smb smbs smtp smtps telnet tftp* 
> *Features: AsynchDNS IDN IPv6 Largefile GSS-API Kerberos SPNEGO NTLM NTLM_WB SSL libz TLS-SRP HTTP2 UnixSockets HTTPS-proxy PSL*

<br>

#### Docker

> **$ sudo apt install apt-transport-https ca-certificates curl software-properties-common**
>
> **$ curl -fsSL https*://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -***
>
> *OK*
>
> **$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"**
>
> **$ sudo apt update**
>
> **$ apt-cache policy docker-ce**
>
> *docker-ce:*
>
> ​	*Installed: (none)*
>
> *...*
>
> **$ sudo apt install docker-ce**
>
> **$ sudo systemctl status docker**
>
> *active (running)*

<br>

- sudo 권한으로 설치했기 때문에 일반 유저로 docker를 실행하려면 권한을 변경해야 함

> **$ sudo chmod a+rwx /var/run/docker.sock**
>
> **$ sudo chmod a+rwx /var/run/docker.pid**
>
> 그래도 안되면
>
> **\$ sudo usermod -a -G docker $USER**

<br>

#### Docker Compose

> ***\$ sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-​\$(uname -m)" -o /usr/local/bin/docker-compose***
>
> **$ docker-compose version**
>
> *Permission denied*
>
> **$ sudo chmod +x /usr/local/bin/docker-compose**
>
> **$ docker-compose version**
>
> *docker-compose version 1.24.1, build 4667896b*
> *docker-py version: 3.7.3*
> *CPython version: 3.6.8*
> *OpenSSL version: OpenSSL 1.1.0j  20 Nov 2018*

<br>

#### Golang

> **$ wget https://dl.google.com/go/go1.13.linux-amd64.tar.gz**
>
> **$ tar -C ../ go1.13.linux-amd64.tar.gz**
>
> **$ sudo mv go/ /usr/local/**
>
> **\$ export PATH=$PATH:/usr/local/go/bin/**
>
> **$ source .profile**
>
> **$ go version**
>
> *go version go1.13 linux/**amd64***

<br>

#### Node.js

> **$ curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -**
>
> **$ sudo apt install nodejs**
>
> **$ node -v**
>
> *v10.16.3*
>
> **$ npm -v**
>
> *v6.9.0*

<br>

#### Python

- 따로 설치하지 않아도 기본적으로 Ubuntu에 탑재되어 있음

> **$ python --version**
>
> *python 2.7.15+*

<br>

### 샘플 코드, 바이너리 및 Docker 이미지 다운로드

- 샘플 코드 및 바이너리 다운로드

> **$ git clone https://github.com/hyperledger/fabric-samples**
>
> *fabric-samples 디렉토리 생성 확인*

<br>

- Fabric Docker 이미지 다운로드

> **$ curl -sSL http://bit.ly/2ysbOFE | bash -s**
>
> **$ docker images**
>
> *fabric 관련 이미지 확인*
>
> *REPOSITORY                     TAG                 IMAGE ID            CREATED             SIZE*
> *hyperledger/fabric-tools       1.4.3               18ed4db0cd57        4 weeks ago         1.55GB*
> *hyperledger/fabric-tools       latest              18ed4db0cd57        4 weeks ago         1.55GB*
> *hyperledger/fabric-ca          1.4.3               c18a0d3cc958        4 weeks ago         253MB*
> *hyperledger/fabric-ca          latest              c18a0d3cc958        4 weeks ago         253MB*
> *hyperledger/fabric-ccenv       1.4.3               3d31661a812a        4 weeks ago         1.45GB*
> *hyperledger/fabric-ccenv       latest              3d31661a812a        4 weeks ago         1.45GB*
> *hyperledger/fabric-orderer     1.4.3               b666a6ebbe09        4 weeks ago         173MB*
> *hyperledger/fabric-orderer     latest              b666a6ebbe09        4 weeks ago         173MB*
> *hyperledger/fabric-peer        1.4.3               fa87ccaed0ef        4 weeks ago         179MB*
> *hyperledger/fabric-peer        latest              fa87ccaed0ef        4 weeks ago         179MB*
> *hyperledger/fabric-javaenv     1.4.3               5ba5ba09db8f        8 weeks ago         1.76GB*
> *hyperledger/fabric-javaenv     latest              5ba5ba09db8f        8 weeks ago         1.76GB*
> *hyperledger/fabric-zookeeper   0.4.15              20c6045930c8        6 months ago        1.43GB*
> *hyperledger/fabric-zookeeper   latest              20c6045930c8        6 months ago        1.43GB*
> *hyperledger/fabric-kafka       0.4.15              b4ab82bbaf2f        6 months ago        1.44GB*
> *hyperledger/fabric-kafka       latest              b4ab82bbaf2f        6 months ago        1.44GB*
> *hyperledger/fabric-couchdb     0.4.15              8de128a55539        6 months ago        1.5GB*
> *hyperledger/fabric-couchdb     latest              8de128a55539        6 months ago        1.5GB*

<br>

### First-Network

- first-network 컨테이너 구동

> **$ cd /fabric-samples/first-network/**
>
> **$ ./byfn.sh**
>
> *docker ps로 org별 peer가 구동되었는지 확인*
>
> **$ docker exec -it cli bash**
>
> *first-network의 컨테이너 인스턴스로 접속*

