import 'package:aramizdakioyuncucom/app/modules/news/_main/controllers/news_controller.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/news/news_list.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class NewsView extends StatelessWidget {
  const NewsView({super.key});

  @override
  Widget build(Object context) {
    final controller = Get.put(NewsController());

    return BodyWidget.custom1(
      context,
      transparentBody: true,
      body: [
        Obx(
          () => controller.fetchnewsProccess.value
              ? const CupertinoActivityIndicator()
              : Wrap(
                  children: [
                    ...List.generate(
                      controller.newsList.value!.length,
                      (index) {
                        APINewsDetail newsINFO =
                            controller.newsList.value![index];
                        return Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: InkWell(
                            onTap: () {
                              // Get.toNamed("/haberler/witcher");

                              Functions.gotoPage(
                                newsINFO.newsURL.split(".com")[1],
                              );
                            },
                            child: Stack(
                              children: [
                                Container(
                                  width: 510,
                                  height: 400,
                                  decoration: BoxDecoration(
                                    borderRadius: const BorderRadius.all(
                                      Radius.circular(5),
                                    ),
                                    image: DecorationImage(
                                      image: CachedNetworkImageProvider(
                                        newsINFO.media.mediaURL.minURL,
                                      ),
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                ),
                                Positioned(
                                  bottom: 0,
                                  child: Container(
                                    height: 180,
                                    width: 510,
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(
                                        colors: [
                                          Colors.black.withOpacity(0.5),
                                          Colors.black.withOpacity(0.3),
                                        ],
                                        begin: Alignment.bottomCenter,
                                        end: Alignment.topCenter,
                                      ),
                                    ),
                                    child: Column(
                                      mainAxisAlignment: MainAxisAlignment.end,
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.all(8.0),
                                          child: Text(
                                            newsINFO.title,
                                            style: const TextStyle(
                                              fontSize: 20,
                                              fontWeight: FontWeight.bold,
                                              color: Colors.white,
                                            ),
                                            maxLines: 2,
                                            overflow: TextOverflow.ellipsis,
                                          ),
                                        ),
                                        const SizedBox(height: 8),
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Container(
                                              color: Colors.lightBlue,
                                              child: Padding(
                                                padding:
                                                    const EdgeInsets.all(8.0),
                                                child: Text(
                                                  newsINFO.category,
                                                  style: const TextStyle(
                                                      color: Colors.white),
                                                ),
                                              ),
                                            ),
                                            Container(
                                              color: Colors.lightBlue,
                                              child: Padding(
                                                padding:
                                                    const EdgeInsets.all(8.0),
                                                child: Text(
                                                  newsINFO
                                                      .newsOwner.displayname,
                                                  style: const TextStyle(
                                                      color: Colors.white),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 8.0),
                                          child: Row(
                                            children: [
                                              IconButton(
                                                onPressed: () {
                                                  Functions.gotoPage(
                                                    "https://twitter.com/intent/tweet?text=${newsINFO.newsURL}",
                                                    newTab: true,
                                                  );
                                                },
                                                icon: const FaIcon(
                                                  FontAwesomeIcons.twitter,
                                                  color: Colors.white,
                                                ),
                                              ),
                                              IconButton(
                                                onPressed: () {
                                                  Functions.gotoPage(
                                                    "https://www.facebook.com/sharer.php?u=${newsINFO.newsURL}",
                                                    newTab: true,
                                                  );
                                                },
                                                icon: const FaIcon(
                                                  FontAwesomeIcons.facebook,
                                                  color: Colors.white,
                                                ),
                                              ),
                                              IconButton(
                                                onPressed: () {
                                                  Functions.gotoPage(
                                                    "whatsapp://send/?text=${newsINFO.newsURL}",
                                                    newTab: true,
                                                  );
                                                },
                                                icon: const FaIcon(
                                                  FontAwesomeIcons.whatsapp,
                                                  color: Colors.white,
                                                ),
                                              ),
                                              const Spacer(),
                                              const Text(
                                                "551 Görüntülenme , 1 Yıl",
                                                style: TextStyle(
                                                  color: Colors.white,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ],
                ),
        ),
      ],
    );
  }
}
