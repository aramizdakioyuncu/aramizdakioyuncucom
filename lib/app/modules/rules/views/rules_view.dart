import 'package:aramizdakioyuncucom/app/modules/rules/controllers/rules_controller.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/rules/rules.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class RulesView extends StatelessWidget {
  const RulesView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(RulesController());
    return BodyWidget.custom1(
      context,
      body: [
        Obx(
          () => controller.rules.value == null
              ? const Center(
                  child: CupertinoActivityIndicator(),
                )
              : Column(
                  children: List.generate(
                    controller.rules.value!.length,
                    (index) {
                      APIRules rulesINFO = controller.rules.value![index];
                      return Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Material(
                          color: Colors.transparent,
                          child: ListTile(
                            tileColor: Colors.red.withOpacity(0.5),
                            leading: const Icon(Icons.warning),
                            title: Text(
                                "${rulesINFO.ruleId} ${rulesINFO.content}"),
                            subtitle: Text(rulesINFO.penaltyDuration),
                            trailing: Text(
                              rulesINFO.penaltyDate,
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
        )
      ],
    );
  }
}
