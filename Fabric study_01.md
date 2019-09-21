## Hyperledger Fabric

### **Fabric의 사전적 의미**

1. *직물, 천*
2. *(사회, 조직 등의) 구조*
3. *(건물의) 기본 구조[뼈대]*

사전적 의미들을 말미암아 보면 기본적인 골조의 역할을 함을 암시할 수 있는데, 뭔가 단단한 느낌이다.

<br>

### Fabric 흐름

Fabric에서는 구성요소를 크게 세 부분으로 나눌 수 있는데 인증서(Certificate), Orderer, Peer가 바로 그것이다.

인증서 기반으로 구동되며, 이는 바로 중간 관리자(Certificate Authority)가 있음을 의미한다.

<br>

1. 클라이언트가 Application 단에서 트랜잭션 생성
2. 생성한 트랜잭션을 각 peer에게 proposal 전송
3. 각 peer는 BFT(2/3 이상 동의)를 통해 해당 트랜잭션을 검증하여 승인되면 클라이언트에 재전달
4. 클라이언트가 승인된 proposal을 packaging하여 orderer에게 전달
5. orderer는 peer부터 검증받은 proposal인지만을 검증하여 블록을 생성하고 각 peer에게 전파

<br>

Endorsement 정책은 상황에 따라 다르다.

<br>

Fabric에서 Ledger라는 주체는 Blockchain, World State, Peer를 포함하는 개념이다.

트랜잭션 이력(Blockchain), 최종 상태(World State)를 함께 들고 있다고 생각하면 이해가 쉽다.

가계부에 수입/지출 내역과 잔액을 함께 기입하는 것처럼!

<br>

### Read/Write Set

Fabric이 갖는 비트코인, 이더리움을 비롯한 퍼블릭 블록체인과의 가장 큰 차이점은 바로 이 Read/Write Set이다.

이게 뭐냐면, 한번 write한 key는 read할 수 없다는 것이다.

이게 뭔 소리여.

이더리움을 예로 들면 miner가 외부에서 전달된 트랜잭션을 블록에 추가시킨다. 그리고 그 트랜잭션이 변경되면 변경된 새로운 트랜잭션2도 블록에 포함되어 모든 변경이력들을 가지고 있다.

트랜잭션에 failure가 발생하더라도 블록에는 전파된다.

Fabric의 방식은 이와 다르다. 이 방식을 쓰는 이유에 대해 기억이 잘 나지 않아 다시 유튜브로 돌아가야겠지만!

태깅을 사용하여 1 write + 1 read를 유지한다.

<br>

> *A	100(최초의 A는 100이다.)*
>
> ---
>
> *A1	+100*
>
> *A2	-10*
>
> *A3	+50*
>
> ---------------
>
> *A	240(최종의 A는 240이다.)*

<br>

언뜻 보기에 A를 한번 write하고 read하여 A1, A2, A3 key를 생성한 것 같지만 모두 다른 key-value이다.

숫자를 제외한 A만으로 각 key들을 태깅하여 각 연산을 처리 후 최종적으로 A에 240이라는 value를 저장한다.

이 특징으로 인해 내가 구축한 Fabric 체인의 성능이 좌우된다. (High Throughput Network)

<br>

시스템을 어떻게 구성하느냐에 따라 달라지겠지만 기본적인 뼈대는 아래와 같을 것 같다.

<br>

> *웹/앱 <--> 서버 <--> Fabric/Chaincode <--> Block Explorer*

<br>

### 각 컴포넌트의 역할

1. Orderer
   - 블록 생성 및 배포
   - 채널 설정
2. Peer
   - 체인 데이터 보유
   - 체인코드(스마트 컨트랙트) 실행
3. User(Application)
   - Peer와 트랜잭션(proposal) 송수신
4. Ledger
   - Blockchain + World State + Peer
5. Chaincode
   - Peer가 있는 컨테이너에 도커 컨테이너 인스턴스 형태로 올라가게 됨
   - 체인코드 별로 각 컨테이너로 올라감
6. CA, Fabric-ca
   - 인증서 관리
   - MSP(Membership Service Provider) 제공
7. Organizations
   - Identity를 관리하는 그룹을 규정
8. Channel
   - 동일한 Channel에 속한 Peer들은 동일한 Ledger와 체인코드를 공유할 수 있음
   - 한 Peer가 여러 Channel에 가입할 수 있음

<br>

### Fabric 작동 순서

1. 크립토 관련 작업
   - Fabric-ca
   - cryptogen으로 인증서 관련 구성요소를 generate
2. Orderer 구동
3. Peer 구동
   - Peer = Chaincode + Block
4. Kafka, Zookeeper 구동
   - 각 컴포턴트 간의 작업과 흐름을 제어
5. Channel 생성
6. User 생성

<br>

Fabric에서 인증서는 X.509 형식이며 .pem 형식의 파일로 공개키를 관리한다.

crypto-config 디렉토리에 ***ordererOrganizations, peerOrganizations*** 디렉토리가 있는데 이들 각각

- keystore에 개인키
- signcertsd에 개인키로 서명한 데이터가 들어 있는 인증서
- cacerts에 ca 인증서, admin 인증서

를 포함하고 있다.