import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:aramizdakioyuncucom/app/widgets/appbar_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/footer_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class BodyWidget {
  static Widget custom1(context, scaffoldKey,
      {String? bgImage, required List<Widget> body}) {
    return Scaffold(
      appBar: AppbarWidget.costum1(context, scaffoldKey),
      endDrawer: Obx(
        () => Applist.currentUser.value == null
            ? const Drawer()
            : Drawer(
                shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.zero),
                backgroundColor: Colors.black,
                child: ListView(
                  padding: EdgeInsets.zero,
                  children: <Widget>[
                    DrawerHeader(
                      margin: const EdgeInsets.all(0),
                      decoration: BoxDecoration(
                        image: DecorationImage(
                          image: CachedNetworkImageProvider(
                            Applist.currentUser.value!.banner!.mediaURL.minURL
                                .value,
                          ),
                          fit: BoxFit.cover,
                        ),
                      ),
                      child: const Text('Drawer Header'),
                    ),
                    const ListTile(
                      leading: FaIcon(
                        FontAwesomeIcons.pencil,
                        color: Colors.white,
                      ),
                      title: Text('Yazılarım'),
                      tileColor: Colors.black,
                      textColor: Colors.white,
                    ),
                    const ListTile(
                      leading: FaIcon(
                        FontAwesomeIcons.lifeRing,
                        color: Colors.white,
                      ),
                      title: Text('Bildirimlerim'),
                      tileColor: Colors.black,
                      textColor: Colors.white,
                    ),
                    const ListTile(
                      leading: FaIcon(
                        FontAwesomeIcons.comment,
                        color: Colors.white,
                      ),
                      title: Text('Yorumum'),
                      tileColor: Colors.black,
                      textColor: Colors.white,
                    ),
                    const ListTile(
                      leading: FaIcon(
                        FontAwesomeIcons.chartSimple,
                        color: Colors.white,
                      ),
                      title: Text('Anketler'),
                      tileColor: Colors.black,
                      textColor: Colors.white,
                    ),
                    ListTile(
                      leading: const FaIcon(
                        FontAwesomeIcons.peopleGroup,
                        color: Colors.white,
                      ),
                      title: const Text('Gruplar'),
                      tileColor: Colors.black,
                      textColor: Colors.white,
                      onTap: () {
                        Get.toNamed("/gruplar");
                      },
                    ),
                    const ListTile(
                      leading: FaIcon(
                        FontAwesomeIcons.ticket,
                        color: Colors.white,
                      ),
                      title: Text('Çekiliş'),
                      tileColor: Colors.black,
                      textColor: Colors.white,
                    ),
                    const ListTile(
                      leading: FaIcon(
                        FontAwesomeIcons.graduationCap,
                        color: Colors.white,
                      ),
                      title: Text('Eğitim'),
                      tileColor: Colors.black,
                      textColor: Colors.white,
                    ),
                  ],
                ),
              ),
      ),
      body: Stack(
        children: [
          CachedNetworkImage(
            imageUrl: bgImage ??
                "https://aramizdakioyuncu.com/galeri/ana-yapi/anaarkaplan.jpg",
            fit: BoxFit.cover,
            width: Get.width,
            height: Get.height,
          ),
          SingleChildScrollView(
            child: Column(
              children: [
                ...body,
                FooterWidget.custom(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
