import 'package:aramizdakioyuncucom/app/constants/api_constants.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class AppWidget {
  static void loginModal(context) {
    var username = TextEditingController().obs;
    var userpassword = TextEditingController().obs;
    var loginStatus = false.obs;
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          content: SizedBox(
            width: 500,
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  CachedNetworkImage(
                    imageUrl:
                        "${APIConstants.storageDomain}/galeri/ana-yapi/armoyu.png",
                    height: 130,
                    width: 130,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: SizedBox(
                          height: 300,
                          child: Column(
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: ARMOYU.widget.textField.costum3(
                                  title: "Kullanıcı Adı",
                                  controller: username.value,
                                  onChanged: (val) {},
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: ARMOYU.widget.textField.costum3(
                                  title: "Şifre",
                                  controller: userpassword.value,
                                  isPassword: true,
                                  onChanged: (val) {},
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Row(
                                  children: [
                                    ClipOval(
                                      child: CachedNetworkImage(
                                        height: 32,
                                        width: 32,
                                        filterQuality: FilterQuality.high,
                                        imageUrl:
                                            "${APIConstants.storageDomain}/galeri/ana-yapi/facebook-logo.png",
                                      ),
                                    ),
                                    const Spacer(),
                                    CachedNetworkImage(
                                      height: 32,
                                      width: 32,
                                      filterQuality: FilterQuality.high,
                                      imageUrl:
                                          "${APIConstants.storageDomain}/galeri/ana-yapi/steam-logo.png",
                                    ),
                                    const Spacer(),
                                    CachedNetworkImage(
                                      height: 32,
                                      width: 32,
                                      filterQuality: FilterQuality.high,
                                      imageUrl:
                                          "${APIConstants.storageDomain}/galeri/ana-yapi/apple-logo.png",
                                    ),
                                    const Spacer(),
                                    CachedNetworkImage(
                                      height: 32,
                                      width: 32,
                                      filterQuality: FilterQuality.high,
                                      imageUrl:
                                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRRToVGTHOEuz4_Lxu_wfQrZGurCrtNb1hpQ&s",
                                    ),
                                  ],
                                ),
                              ),
                              SizedBox(
                                width: 500,
                                child: Obx(
                                  () => ARMOYU.widget.elevatedButton.costum1(
                                    text: "Giriş YAP",
                                    onPressed: () async {
                                      loginStatus.value = true;
                                      bool islogin = await Functions.login(
                                        username: username.value.text,
                                        password: userpassword.value.text,
                                      );
                                      loginStatus.value = false;

                                      if (islogin) {
                                        Functions.reloadPage();
                                      } else {
                                        Get.snackbar(
                                          "Giriş Başarısız",
                                          "Kullanıcı adı veya şifre yanlış.",
                                        );
                                      }
                                    },
                                    loadingStatus: loginStatus.value,
                                  ),
                                ),
                              ),
                              const Spacer(),
                              ElevatedButton(
                                style: const ButtonStyle(
                                    shape: WidgetStatePropertyAll(
                                      RoundedRectangleBorder(
                                        borderRadius: BorderRadius.zero,
                                      ),
                                    ),
                                    backgroundColor: WidgetStatePropertyAll(
                                      Colors.purple,
                                    )),
                                onPressed: () {},
                                child: const Text("ŞİFRE AL"),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Expanded(
                        child: SizedBox(
                          height: 300,
                          child: Column(
                            children: [
                              CachedNetworkImage(
                                  imageUrl:
                                      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=159-146-79-16-23-09"),
                              const Text("Kalan Zaman:"),
                              const Spacer(),
                              ElevatedButton(
                                style: const ButtonStyle(
                                  shape: WidgetStatePropertyAll(
                                    RoundedRectangleBorder(
                                      borderRadius: BorderRadius.zero,
                                    ),
                                  ),
                                ),
                                onPressed: () {},
                                child: const Text("KAYIT OL"),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  static void showMusicDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return const AlertDialog(
              title: Text("Müziklerim"),
              content: SingleChildScrollView(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [],
                ),
              ),
              // actions: [],
            );
          },
        );
      },
    );
  }

  static void showSettingsDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              title: const Text("Ayarlarım"),
              content: SingleChildScrollView(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    preicon:
                                        const Icon(FontAwesomeIcons.facebook),
                                    title: "Facebook",
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    preicon:
                                        const Icon(FontAwesomeIcons.instagram),
                                    title: "Instagram",
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    preicon:
                                        const Icon(FontAwesomeIcons.linkedin),
                                    title: "Linledin",
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    preicon:
                                        const Icon(FontAwesomeIcons.youtube),
                                    title: "Youtube",
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    preicon:
                                        const Icon(FontAwesomeIcons.twitch),
                                    title: "Twitch",
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    preicon:
                                        const Icon(FontAwesomeIcons.reddit),
                                    title: "Reddit",
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    preicon:
                                        const Icon(FontAwesomeIcons.github),
                                    title: "Github",
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    preicon: const Icon(FontAwesomeIcons.steam),
                                    title: "Steam",
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    preicon: const Icon(FontAwesomeIcons.steam),
                                    title: "Discord",
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                  ),
                                ),
                                ARMOYU.widget.elevatedButton.costum1(
                                  text: "Kaydet",
                                  onPressed: () {},
                                  loadingStatus: false,
                                ),
                              ],
                            ),
                          ),
                        ),
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              children: [
                                SizedBox(
                                  height: 100,
                                  child: Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      CachedNetworkImage(
                                        imageUrl:
                                            "${APIConstants.storageDomain}/galeri/ana-yapi/bay.png",
                                        height: 100,
                                        width: 100,
                                      ),
                                      CachedNetworkImage(
                                        imageUrl:
                                            "${APIConstants.storageDomain}/galeri/ana-yapi/bayan.png",
                                        height: 100,
                                        width: 100,
                                      ),
                                    ],
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                    title: "Meslek Seçim",
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                    title: "E-Posta",
                                    type: TextInputType.emailAddress,
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                    title: "Cep Numara",
                                    type: TextInputType.number,
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.textField.costum3(
                                    controller: TextEditingController(),
                                    onChanged: (val) {},
                                    title: "Doğum Tarihi",
                                    type: TextInputType.datetime,
                                  ),
                                ),
                                Row(
                                  children: [
                                    Expanded(
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: ARMOYU.widget.textField.costum3(
                                          controller: TextEditingController(),
                                          onChanged: (val) {},
                                          title: "Ülke Seçim",
                                          type: TextInputType.datetime,
                                        ),
                                      ),
                                    ),
                                    Expanded(
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: ARMOYU.widget.textField.costum3(
                                          controller: TextEditingController(),
                                          onChanged: (val) {},
                                          title: "Şehir Seçim",
                                          type: TextInputType.datetime,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                                ARMOYU.widget.elevatedButton.costum1(
                                  text: "Kaydet",
                                  onPressed: () {},
                                  loadingStatus: false,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: ARMOYU.widget.textField.costum3(
                        controller: TextEditingController(),
                        onChanged: (val) {},
                        title: "Mevcut Parola",
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: ARMOYU.widget.textField.costum3(
                        controller: TextEditingController(),
                        onChanged: (val) {},
                        preicon: const Icon(Icons.lock),
                        title: "Yeni Parola",
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: ARMOYU.widget.textField.costum3(
                        controller: TextEditingController(),
                        onChanged: (val) {},
                        preicon: const Icon(Icons.lock),
                        title: "Yeni Parolanızı Tekrar Giriniz",
                      ),
                    ),
                    ARMOYU.widget.elevatedButton.costum1(
                      text: "Kaydet",
                      onPressed: () {},
                      loadingStatus: false,
                    ),
                  ],
                ),
              ),
              // actions: [],
            );
          },
        );
      },
    );
  }

  static Widget controlpanelMenu({
    int? selectedIndex,
    required Function(int index) onTap,
  }) {
    var selectedIndexobx = selectedIndex.obs;
    return Obx(
      () => Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          IconButton(
            onPressed: () {
              onTap(0);
              selectedIndexobx.value = 0;
            },
            icon: FaIcon(
              FontAwesomeIcons.house,
              color: selectedIndexobx.value == 0 ? Colors.red : null,
            ),
          ),
          IconButton(
            onPressed: () {
              onTap(1);
              selectedIndexobx.value = 1;
            },
            icon: FaIcon(
              FontAwesomeIcons.chair,
              color: selectedIndexobx.value == 1 ? Colors.red : null,
            ),
          ),
          IconButton(
            onPressed: () {
              onTap(2);
              selectedIndexobx.value = 2;
            },
            icon: FaIcon(
              FontAwesomeIcons.chartColumn,
              color: selectedIndexobx.value == 2 ? Colors.red : null,
            ),
          ),
          IconButton(
            onPressed: () {
              onTap(3);
              selectedIndexobx.value = 3;
            },
            icon: FaIcon(
              FontAwesomeIcons.userPlus,
              color: selectedIndexobx.value == 3 ? Colors.red : null,
            ),
          ),
          IconButton(
            onPressed: () {
              onTap(4);
              selectedIndexobx.value = 4;
            },
            icon: FaIcon(
              FontAwesomeIcons.users,
              color: selectedIndexobx.value == 4 ? Colors.red : null,
            ),
          ),
          IconButton(
            onPressed: () {
              onTap(5);
              selectedIndexobx.value = 5;
            },
            icon: FaIcon(
              FontAwesomeIcons.lifeRing,
              color: selectedIndexobx.value == 5 ? Colors.red : null,
            ),
          ),
          IconButton(
            onPressed: () {
              onTap(6);
              selectedIndexobx.value = 6;
            },
            icon: FaIcon(
              FontAwesomeIcons.pen,
              color: selectedIndexobx.value == 6 ? Colors.red : null,
            ),
          ),
          IconButton(
            onPressed: () {
              onTap(7);
              selectedIndexobx.value = 7;
            },
            icon: FaIcon(
              FontAwesomeIcons.calendarDays,
              color: selectedIndexobx.value == 7 ? Colors.red : null,
            ),
          ),
          IconButton(
            onPressed: () {
              onTap(8);
              selectedIndexobx.value = 8;
            },
            icon: FaIcon(
              FontAwesomeIcons.graduationCap,
              color: selectedIndexobx.value == 8 ? Colors.red : null,
            ),
          ),
          IconButton(
            onPressed: () {
              onTap(9);
              selectedIndexobx.value = 9;
            },
            icon: FaIcon(
              FontAwesomeIcons.ticket,
              color: selectedIndexobx.value == 9 ? Colors.red : null,
            ),
          ),
          IconButton(
            onPressed: () {
              onTap(10);
              selectedIndexobx.value = 10;
            },
            icon: FaIcon(
              FontAwesomeIcons.bullhorn,
              color: selectedIndexobx.value == 10 ? Colors.red : null,
            ),
          ),
          IconButton(
            onPressed: () {
              onTap(11);
              selectedIndexobx.value = 11;
            },
            icon: FaIcon(
              FontAwesomeIcons.gear,
              color: selectedIndexobx.value == 11 ? Colors.red : null,
            ),
          ),
        ],
      ),
    );
  }
}
