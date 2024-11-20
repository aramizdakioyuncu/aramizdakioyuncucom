import 'package:aramizdakioyuncucom/app/modules/home/controllers/home_controller.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:aramizdakioyuncucom/app/widgets/app_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(HomeController());

    return Scaffold(
      backgroundColor: Colors.black87,
      appBar: AppBar(
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: CachedNetworkImage(
            imageUrl:
                "https://aramizdakioyuncu.com/galeri/ana-yapi/armoyu64.png",
          ),
        ),
        actions: [
          TextButton(onPressed: () {}, child: const Text("Gruplar")),
          TextButton(onPressed: () {}, child: const Text("Galeriler")),
          TextButton(onPressed: () {}, child: const Text("Haberler")),
          TextButton(onPressed: () {}, child: const Text("Ekibimiz")),
          TextButton(onPressed: () {}, child: const Text("Çekilişler")),
          TextButton(onPressed: () {}, child: const Text("Forum")),
          TextButton(onPressed: () {}, child: const Text("Modlar")),
          TextButton(onPressed: () {}, child: const Text("Mağaza")),
          TextButton(onPressed: () {}, child: const Text("Projeler")),
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.search),
          ),
          Obx(
            () => Applist.currentUser.value == null
                ? IconButton(
                    onPressed: () {
                      AppWidget.loginModal(
                        context,
                        username: controller.usernameController.value,
                        userpassword: controller.userpassController.value,
                        login: controller.login,
                        register: controller.login,
                      );
                    },
                    icon: const Icon(Icons.person),
                  )
                : Row(
                    children: [
                      IconButton(
                        onPressed: () {},
                        icon: const Icon(Icons.notifications),
                      ),
                      CircleAvatar(
                        backgroundColor: Colors.transparent,
                        foregroundImage: CachedNetworkImageProvider(
                          Applist.currentUser.value!.avatar!.mediaURL.normalURL
                              .value,
                        ),
                      ),
                      IconButton(
                        onPressed: () {},
                        icon: const Icon(Icons.menu),
                      ),
                    ],
                  ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            CarouselSlider.builder(
              options: CarouselOptions(
                height: 700,
                aspectRatio: 16 / 9,
                viewportFraction: 1,
                initialPage: 0,
                enableInfiniteScroll: true,
                reverse: false,
                autoPlay: true,
                autoPlayInterval: const Duration(seconds: 3),
                autoPlayAnimationDuration: const Duration(milliseconds: 1500),
                autoPlayCurve: Curves.fastOutSlowIn,
                enlargeCenterPage: true,
                enlargeFactor: 0.3,
                onPageChanged: (index, reason) {},
                scrollDirection: Axis.horizontal,
              ),
              itemCount: Applist.defaultslider.length,
              itemBuilder: (context, index, realIndex) {
                return Container(
                  width: Get.width,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: CachedNetworkImageProvider(
                        Applist.defaultslider[index],
                      ),
                      fit: BoxFit.cover,
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Expanded(
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Container(
                                  padding: const EdgeInsets.all(8),
                                  decoration: const BoxDecoration(
                                    borderRadius:
                                        BorderRadius.all(Radius.circular(5)),
                                    color: Colors.black45,
                                  ),
                                  child: const Column(
                                    children: [
                                      Text(
                                        'Spor ',
                                        style: TextStyle(
                                          fontSize: 16.0,
                                          color: Colors.white,
                                        ),
                                      ),
                                      Text(
                                        "Peki sen oynucu olarak yaptığın sporda daha fazla heyecan ve olayın içinde hissetmek mi istiyorsun o zaman normal sporlara alalım da vucüd dengenle beraber en iyi performansını sergile bu sporlar tamamen fiziki bir şekilde oynanır. o zaman seni Futbol ve Voleybol Turnuvalarımıza bekleriz.takımını oluştur...",
                                        style: TextStyle(
                                          color: Colors.white,
                                        ),
                                      )
                                    ],
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Container(
                                  padding: const EdgeInsets.all(8),
                                  decoration: const BoxDecoration(
                                    borderRadius:
                                        BorderRadius.all(Radius.circular(5)),
                                    color: Colors.black45,
                                  ),
                                  child: const Column(
                                    children: [
                                      Text(
                                        'E-Spor ',
                                        style: TextStyle(
                                          fontSize: 16.0,
                                          color: Colors.white,
                                        ),
                                      ),
                                      Text(
                                        "Yada sen ekran başında bizim gibi bileklerinin kuvvetleriyle bir şeyler yapmaya bayılıyorsun o zaman seni E-spor turnuvalarımıza alalım ve çeşitli ödülleri ile bileğinin hakkını verelim. E-spor kariyerinde üstün başarılarını bizimle yakala ve milli takımlarımızda senin de yerin olsun hemen gruplardan takımını oluştur...",
                                        style: TextStyle(
                                          color: Colors.white,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
            CachedNetworkImage(
              imageUrl:
                  "https://aramizdakioyuncu.com/galeri/tanitim/tanitim.jpg",
            ),
            Container(
              height: 120,
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Color.fromARGB(255, 0, 245, 212),
                    Color.fromARGB(255, 230, 0, 255),
                  ],
                  begin: Alignment.centerLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: const Row(
                children: [
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.man,
                          color: Colors.white,
                          size: 65,
                        ),
                        Text(
                          "1419",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 25,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(
                    width: 10,
                  ),
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.woman,
                          color: Colors.white,
                          size: 65,
                        ),
                        Text(
                          "90",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 25,
                          ),
                        ),
                      ],
                    ),
                  )
                ],
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                width: Get.width,
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      Colors.black,
                      Colors.black,
                      Colors.black,
                      Colors.black,
                      Colors.black,
                      Colors.black,
                      Colors.black,
                      Colors.black,
                      Colors.black,
                      Colors.red,
                    ],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                ),
                child: Column(
                  children: [
                    Row(
                      children: [
                        const Spacer(),
                        SizedBox(
                          width: Get.width / 4,
                          height: 300,
                          child: const Padding(
                            padding: EdgeInsets.all(8.0),
                            child: Column(
                              children: [
                                Text(
                                  "Mevcut Oyuncu Sayımız",
                                  style: TextStyle(
                                    fontSize: 18,
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                Text(
                                  "1684",
                                  style: TextStyle(
                                    fontSize: 60,
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        SizedBox(
                          width: Get.width / 4,
                          height: 300,
                          child: const Padding(
                            padding: EdgeInsets.all(8.0),
                            child: Column(
                              children: [
                                Text(
                                  "Çevrimiçi Üyelerimiz",
                                  style: TextStyle(
                                    fontSize: 18,
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                Text(
                                  "Açık Kimse Yok",
                                  style: TextStyle(
                                    fontSize: 30,
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        SizedBox(
                          width: Get.width / 4,
                          height: 300,
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              children: [
                                const Text(
                                  "Haberler",
                                  style: TextStyle(
                                    fontSize: 18,
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                Row(
                                  children: [
                                    CachedNetworkImage(
                                      imageUrl:
                                          "https://aramizdakioyuncu.com/galeri/yazi/1posterminnak1715776167.jpg",
                                      width: 170,
                                      height: 100,
                                      fit: BoxFit.cover,
                                    ),
                                    const Expanded(
                                      child: Padding(
                                        padding: EdgeInsets.all(8.0),
                                        child: Column(
                                          children: [
                                            Text(
                                              "Fatsa'da Türk Halk Müziği konseri yapıldı.",
                                              textAlign: TextAlign.center,
                                              style: TextStyle(
                                                fontSize: 12,
                                                color: Colors.white,
                                              ),
                                            ),
                                            Text(
                                              "Konserde çok güzel eğlenildi ödülleri verildif akls fjklsg jklsgf kdsjdsks ljlık...",
                                              textAlign: TextAlign.justify,
                                              style: TextStyle(
                                                fontSize: 10,
                                                color: Colors.white,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    )
                                  ],
                                ),
                                const Divider(
                                  color: Colors.red,
                                  thickness: 0.5,
                                ),
                                Row(
                                  children: [
                                    CachedNetworkImage(
                                      imageUrl:
                                          "https://aramizdakioyuncu.com/galeri/yazi/417haberlerminnak1675644437.jpg",
                                      width: 170,
                                      height: 100,
                                      fit: BoxFit.cover,
                                    ),
                                    const Expanded(
                                      child: Padding(
                                        padding: EdgeInsets.all(8.0),
                                        child: Column(
                                          children: [
                                            Text(
                                              "The Witcher 3 Patch 4.01 Güncellemesi",
                                              textAlign: TextAlign.center,
                                              style: TextStyle(
                                                fontSize: 12,
                                                color: Colors.white,
                                              ),
                                            ),
                                            Text(
                                              "Konserde çok güzel eğlenildi ödülleri verildif akls fjklsg jklsgf kdsjdsks ljlık...",
                                              textAlign: TextAlign.justify,
                                              style: TextStyle(
                                                fontSize: 10,
                                                color: Colors.white,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    )
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                        SizedBox(
                          width: Get.width / 4,
                          height: 300,
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              children: [
                                const Text(
                                  "Sosyal Bağlantılar",
                                  style: TextStyle(
                                    fontSize: 18,
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                Expanded(
                                  child: GridView.builder(
                                    itemCount:
                                        Applist.footersocailnetwork.length,
                                    gridDelegate:
                                        const SliverGridDelegateWithFixedCrossAxisCount(
                                      crossAxisCount: 3,
                                      childAspectRatio: 1.4,
                                    ),
                                    itemBuilder: (context, index) {
                                      return CachedNetworkImage(
                                        imageUrl:
                                            Applist.footersocailnetwork[index],
                                        height: 40,
                                        width: 40,
                                      );
                                    },
                                  ),
                                ),
                                CachedNetworkImage(
                                  imageUrl:
                                      "https://aramizdakioyuncu.com/galeri/ana-yapi/etbis.png",
                                  height: 60,
                                  width: 60,
                                ),
                                const Text(
                                  "Bu site ETBİS'e kayıtlıdır",
                                  style: TextStyle(
                                    color: Colors.white,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const Spacer(),
                      ],
                    ),
                    const Row(
                      children: [
                        Expanded(
                          child: Text(
                            "Bu aramizdakioyuncu.com platformun Tüm Hakları Saklıdır.",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                        ),
                        Expanded(
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.mail,
                                color: Colors.white,
                              ),
                              Text(
                                "yonetimekibi@aramizdakioyuncu.com",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ),
                        Expanded(
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.phone,
                                color: Colors.white,
                              ),
                              Text(
                                "+905370585150",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
