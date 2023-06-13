<template>
  <div id="user-profile" class="profile">
    <div class="profile-head">
      <div class="container">
        <div class="row">
          <h2 class="content-heading">Tài khoản của tôi</h2>
          <div class="col-md-2">
            <div class="avatar">
              <div class="cover">
                <img
                  src="https://lh3.googleusercontent.com/a/AGNmyxaEVo0KIUY8VAt0620wxlOKZjEzaRaPFj44zFdC=s96-c"
                  alt="Rever"
                  style="opacity: 1"
                />
              </div>
              <a
                href="javascript:document.getElementById('selectAvatar').click()"
                class="change-avatar"
                >Đổi ảnh đại diện</a
              >
              <form method="POST" enctype="multipart/form-data" id="avataForm">
                <input
                  type="file"
                  id="selectAvatar"
                  name="file"
                  accept="image/jpg,image/jpeg,image/png"
                  style="display: none"
                />
              </form>
            </div>
          </div>
          <div class="col-md-10 p-0">
            <div class="row">
              <div class="form-group col-md-6">
                <label for="firstname">Họ và tên đệm</label>
                <input type="text" class="form-control" />
              </div>
              <div class="form-group col-md-6">
                <label for="firstname">Tên</label> <input type="text" class="form-control" />
                <span class="text-error" style="display: none">Thông tin bắt buộc</span>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6 phone--group">
                <label for="phone">Số điện thoại</label>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="form-group col-md-6">
                <label for="email"
                  >Email
                  <!----></label
                >
                <input type="email" class="form-control" />
              </div>
            </div>
            <div class="head-cta">
              <div class="col-left"></div>
              <div class="col-right">
                <ul class="group-cta-email">
                  <li><a href="#" class="change-email">Thay đổi email</a></li>
                  <li style="display: none">
                    <a href="#" class="confirm-account">Xác thực tài khoản</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-content">
      <div class="profile-section">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h2 class="font-tiempos title">
                Thông tin thêm
                <div class="tooltip">
                  <i class="zmdi zmdi-alert-circle"></i>
                  <span class="tooltiptext right"
                    >Các thông tin cá nhân để Rever hiểu thêm về bạn.</span
                  >
                </div>
              </h2>
            </div>
            <div class="form-group col-md-6 arrow-down">
              <label for="gender">Giới tính</label>
              <div data-v-7cbda427="">
                <i
                  data-v-7cbda427=""
                  class="zmdi zmdi-chevron-down icon-profile__right icon--down"
                ></i>
                <input
                  data-v-7cbda427=""
                  placeholder=""
                  class="form-control u-dropdown"
                />
                <ul data-v-7cbda427="" class="u-dropdown-list">
                  <li data-v-7cbda427="">Nam</li>
                  <li data-v-7cbda427="">Nữ</li>
                  <li data-v-7cbda427="">Khác</li>
                </ul>
              </div>
            </div>
            <div class="form-group col-md-6">
              <i class="zmdi zmdi-calendar icon-profile__right"></i>
              <label for="birthday2">Ngày sinh</label>
              <input
                data-v-20ff3525=""
                type="text"
                name=""
                id="birthday2"
                autocomplete="ssoff"
                class="form-control"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="marital-status">Tính trạng hôn nhân</label>
              <div data-v-7cbda427="">
                <i
                  data-v-7cbda427=""
                  class="zmdi zmdi-chevron-down icon-profile__right icon--down"
                ></i>
                <input
                  data-v-7cbda427=""
                  placeholder=""
                  class="form-control u-dropdown"
                />
                <ul data-v-7cbda427="" class="u-dropdown-list">
                  <li data-v-7cbda427="">Độc thân</li>
                  <li data-v-7cbda427="">Đã kết hôn</li>
                  <li data-v-7cbda427="">Khác</li>
                </ul>
              </div>
            </div>
            <div class="form-group col-md-6">
              <i class="zmdi zmdi-calendar icon-profile__right"></i>
              <label for="wedding">Ngày kết hôn</label>
              <input
                data-v-20ff3525=""
                type="text"
                name=""
                id=""
                autocomplete="ssoff"
                class="form-control"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="address">Địa chỉ liên hệ</label>
              <input type="text" placeholder="" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="jobname">Công việc</label>
              <div data-v-7cbda427="">
                <i
                  data-v-7cbda427=""
                  class="zmdi zmdi-chevron-down icon-profile__right icon--down"
                ></i>
                <input
                  data-v-7cbda427=""
                  placeholder=""
                  class="form-control u-dropdown"
                />
                <ul data-v-7cbda427="" class="u-dropdown-list">
                  <li data-v-7cbda427="">Nhân viên kinh doanh</li>
                  <li data-v-7cbda427="">Nhân viên văn phòng</li>
                  <li data-v-7cbda427="">Quản lý</li>
                  <li data-v-7cbda427="">Nội trợ</li>
                  <li data-v-7cbda427="">Khác</li>
                </ul>
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="facebook">Facebook</label>
              <input type="text" placeholder="" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="linked">Linkedin</label>
              <input type="text" placeholder="" class="form-control" />
            </div>
          </div>
        </div>
      </div>
      <div class="profile-section extra-info">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2 class="font-tiempos title">
                Nhu cầu nhà đất
                <div class="tooltip">
                  <i class="zmdi zmdi-alert-circle"></i>
                  <span class="tooltiptext right"
                    >Các thông tin về nhu cầu bất động sản của bạn để Rever giới thiệu đến bạn những
                    nhà đất phù hợp nhất.</span
                  >
                </div>
              </h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label for="" class="label">Bạn là</label>
              <ul class="extra-list">
                <li>
                  <input id="check1" type="checkbox" class="check" />
                  <label for="check1">Người mua</label>
                </li>
                <li>
                  <input id="check2" type="checkbox" class="check" />
                  <label for="check2">Người Thuê</label>
                </li>
                <li>
                  <input id="check3" type="checkbox" class="check" />
                  <label for="check3">Người bán</label>
                </li>
                <li>
                  <input id="check4" type="checkbox" class="check" />
                  <label for="check4">Người cho thuê</label>
                </li>
              </ul>
            </div>
            <div class="col-md-6"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
