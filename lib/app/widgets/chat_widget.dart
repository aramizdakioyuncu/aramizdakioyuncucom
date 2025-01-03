import 'dart:developer';

import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:armoyu_widgets/data/models/Chat/chat.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ChatWidget {
  static Widget chatlistWidget(context, RxList<Rxn<Chat>> chatdetails) {
    var chatliststatus = false.obs;

    return Obx(
      () => Applist.currentUser.value == null
          ? Container()
          : Positioned(
              right: 0,
              bottom: 0,
              child: Obx(
                () => Container(
                  height: chatliststatus.value ? 500 : null,
                  width: 300,
                  color: Colors.grey.shade800,
                  child: Column(
                    children: [
                      AppBar(
                        title: const Text('Sohbet'),
                        actions: [
                          IconButton(
                            onPressed: () {
                              chatliststatus.value = !chatliststatus.value;
                            },
                            icon: const Icon(Icons.arrow_drop_down_sharp),
                          )
                        ],
                      ),
                      chatliststatus.value == true
                          ? ARMOYU.widget.chat.chatmyfriendsNotes(context)
                          : Container(),
                      chatliststatus.value == true
                          ? Expanded(
                              child: ARMOYU.widget.chat.chatListWidget(
                                context,
                                scrollController: ScrollController(),
                                onPressed: (chat) {
                                  if (!chatdetails.any((detail) =>
                                      detail.value?.user.userID ==
                                      chat.user.userID)) {
                                    chatdetails.add(Rxn<Chat>(chat));
                                    chatdetails.refresh();
                                  }
                                },
                              ),
                            )
                          : Container(),
                    ],
                  ),
                ),
              ),
            ),
    );
  }

  static Widget chatdetailWidgets(
      BuildContext context, RxList<Rxn<Chat>> chatdetails) {
    return Obx(
      () => Align(
        alignment: Alignment.bottomRight,
        child: Padding(
          padding: const EdgeInsets.only(right: 300.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: List.generate(chatdetails.length, (index) {
              var chatdetail = chatdetails[index];
              log(chatdetails[index].value!.toJson().toString());
              var chatcalling = chatdetails[index].value!.calling;
              log(chatcalling.toString());

              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 2.0),
                child: Container(
                  height: 500,
                  width: 300,
                  color: Colors.grey.shade800,
                  child: chatcalling!.value == true
                      ? ARMOYU.widget.chat.chatcallWidget(
                          context,
                          chat: chatdetail.value!,
                          onClose: (chat) {
                            chatcalling.value = false;
                          },
                          speaker: (value) {
                            log(value.toString());
                          },
                          videocall: (value) {
                            log(value.toString());
                          },
                        )
                      : ARMOYU.widget.chat.chatdetailWidget(
                          context,
                          chat: chatdetail.value!,
                          chatcall: (chat) {
                            log("ringing");
                            chatcalling.value = true;
                          },
                          onClose: () {
                            chatdetails.remove(chatdetail);
                          },
                          onPressedtoProfile: (userID, username) {
                            Functions.gotoPage("oyuncular/$username");
                          },
                        ),
                ),
              );
            }).toList(),
          ),
        ),
      ),
    );
  }
}
