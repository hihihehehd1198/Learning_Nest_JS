Learning nest js : </br>
## validation : 
optional : tùy chọn param truyền vào có thể có hoặc không , </br>
each : khi data / param truyền vào là 1 mảng , thì each nó sẽ check từng phần tử bên trong mảng đó </br>


## Query 
connect/disconnect : nối/hủy khóa phụ thuộc của bảng này với bảng khác </br>
ví dụ : bảng class có student , thì student trong class đó cần lấy thông tin từ bảng student ra </br>
do đó connect ở đây để tạo mối liên kết giữa bảng student với bảng class </br>
trong case này , thì bảng class sẽ liên kết với bằng student thông qua ID của student trong bảng student</br>
- khi update student trong class , thì connect sẽ làm nhiệm vụ update thẳng studentID với id mới được truyền vào </br>
và disconect làm việc remove các student cũ với id được chỉ định và remove liên kết </br>
select : lấy ra các trường đổ về ứng với record được select </br>
include : select đến thông tin của record có liên quan , ví dụ class với student </br>

##JS 
An empty string (''), the number 0, null, NaN, a boolean false, and undefined variables are all “falsy”. Everything else is “truthy”.
