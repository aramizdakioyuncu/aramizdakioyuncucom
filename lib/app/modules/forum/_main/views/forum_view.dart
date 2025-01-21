import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class ForumView extends StatelessWidget {
  const ForumView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Container(
          color: Colors.white,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const SizedBox(height: 10),
                    Container(
                      decoration: const BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            Color.fromARGB(255, 108, 149, 212),
                            Color.fromARGB(255, 42, 72, 183),
                          ],
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                        ),
                      ),
                      height: 60,
                      child: const Center(
                        child: Text(
                          "FORUMLAR",
                          style: TextStyle(
                            fontSize: 35,
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                    ...List.generate(
                      10,
                      (index) {
                        return const ListTile(
                          leading: CircleAvatar(
                            foregroundImage: CachedNetworkImageProvider(
                              "https://aramizdakioyuncu.com/galeri/profilresimleri/10962profilresimminnak1713689039.jpg",
                            ),
                          ),
                          title: Text(
                            "Tlauncher OPENGL Sorunu",
                            style: TextStyle(
                              color: Color.fromARGB(255, 10, 145, 241),
                            ),
                          ),
                          subtitle: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                "Enver Edehem",
                                style: TextStyle(
                                  fontSize: 10,
                                  color: Color.fromARGB(255, 140, 140, 140),
                                ),
                              ),
                              SizedBox(width: 5),
                              Text(
                                "5 dakika önce",
                                style: TextStyle(
                                  fontSize: 10,
                                  color: Color.fromARGB(255, 140, 140, 140),
                                ),
                              ),
                              SizedBox(width: 5),
                              Text(
                                "Teknik Destek",
                                style: TextStyle(
                                  fontSize: 10,
                                  color: Color.fromARGB(255, 140, 140, 140),
                                ),
                              ),
                            ],
                          ),
                          trailing: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Padding(
                                padding: EdgeInsets.symmetric(horizontal: 18.0),
                                child: Column(
                                  children: [
                                    FaIcon(
                                      FontAwesomeIcons.envelope,
                                      color: Colors.red,
                                    ),
                                    Text(
                                      "10",
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Padding(
                                padding: EdgeInsets.symmetric(horizontal: 18.0),
                                child: Column(
                                  children: [
                                    FaIcon(
                                      FontAwesomeIcons.hourglassStart,
                                      color: Colors.red,
                                    ),
                                    Text(
                                      "5 Dakika Önce",
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Padding(
                                padding: EdgeInsets.symmetric(horizontal: 18.0),
                                child: Column(
                                  children: [
                                    1 == 1
                                        ? FaIcon(
                                            FontAwesomeIcons.check,
                                            color: Colors.green,
                                          )
                                        : CupertinoActivityIndicator(
                                            color: Colors.red,
                                          ),
                                    Text(
                                      1 == 1 ? "Çözüldü" : "Çözülmemiş",
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    )
                                  ],
                                ),
                              )
                            ],
                          ),
                        );
                      },
                    )
                  ],
                ),
              ),
              const SizedBox(
                width: 260,
                child: Column(
                  children: [
                    Text(
                      "Çekilişlere katılmak için oturum açmak gerekir",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                      ),
                      textAlign: TextAlign.center,
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
