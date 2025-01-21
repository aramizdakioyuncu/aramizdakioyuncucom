import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ForumdetailView extends StatelessWidget {
  const ForumdetailView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Column(
                children: [
                  Row(
                    children: [
                      const SizedBox(
                        width: 200,
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            CircleAvatar(
                              radius: 60,
                              foregroundImage: CachedNetworkImageProvider(
                                "https://aramizdakioyuncu.com/galeri/profilresimleri/10962profilresimufaklik1713689039.jpg",
                                scale: 2,
                              ),
                            ),
                            Text("Konu Sayısı 19"),
                            Text("Yanıt Sayısı 12"),
                          ],
                        ),
                      ),
                      Expanded(
                        child: Column(
                          children: [
                            const Padding(
                              padding: EdgeInsets.all(8.0),
                              child: Text(
                                "Tlauncher OPENGL Sorunu",
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            Container(
                              width: double.infinity,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(
                                  color: Colors.blue.withOpacity(0.5),
                                  width: 2,
                                ),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.blue.withOpacity(0.3),
                                    blurRadius: 10, // Yumuşatma efekti
                                    spreadRadius: 1,
                                  ),
                                ],
                              ),
                              child: const Padding(
                                padding: EdgeInsets.all(8.0),
                                child: Text(
                                    """Merhaba arkadaşlar, Minecraft girmek istedik fakat bir sorunla karşılaştık yardımcı olabilir misiniz hata mesajı :
                                                        ---------------------------
                                                        Minecraft
                                                        ---------------------------
                                                        GLFW error 65542: WGL: The driver does not appear to support OpenGL.
                                                        
                                                        Please make sure you have up-to-date drivers (see aka.ms/mcdriver for instructions).
                                                        ---------------------------
                                                        Tamam
                                                        ---------------------------
                                                        
                                                        
                                                        """),
                              ),
                            ),
                          ],
                        ),
                      )
                    ],
                  ),
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Padding(
                          padding: EdgeInsets.all(8.0),
                          child: SizedBox(
                            width: 100,
                            child: TextField(
                              decoration: InputDecoration(labelText: "Ad"),
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.all(8.0),
                          child: SizedBox(
                            width: 100,
                            child: TextField(
                              decoration: InputDecoration(labelText: "Soyad"),
                            ),
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.all(8.0),
                          child: SizedBox(
                            width: 100,
                            child: TextField(
                              decoration: InputDecoration(labelText: "E-posta"),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Container(
                      height: 100,
                      decoration: BoxDecoration(
                        color: Get.theme.highlightColor,
                        borderRadius: const BorderRadius.all(
                          Radius.circular(10),
                        ),
                      ),
                      child: const Padding(
                        padding: EdgeInsets.all(2.0),
                        child: TextField(
                          minLines: 1,
                          maxLines: 100,
                          decoration: InputDecoration(
                            border: InputBorder.none,
                          ),
                        ),
                      ),
                    ),
                  ),
                  ElevatedButton(
                    onPressed: () {},
                    child: const Text(
                      "Gönder",
                    ),
                  ),
                  const SizedBox(height: 100)
                ],
              ),
            ),
            const SizedBox(
              width: 260,
            ),
          ],
        )
      ],
    );
  }
}
