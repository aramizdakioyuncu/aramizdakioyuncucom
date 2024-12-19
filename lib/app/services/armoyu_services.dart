import 'package:armoyu_services/armoyu_services.dart';
import 'package:armoyu_widgets/widget.dart';

class ARMOYU {
  static ARMOYUServices service = ARMOYUServices(
    apiKey: "bda0b6f27fc1a6a87e8ba8cd9ab339ca",
    usePreviousAPI: true,
  );

  static ARMOYUWidget widget = ARMOYUWidget(service: service);
}
