FROM openjdk:11.0.2

ARG PACKAGE_VER
ENV PACKAGE_VER ${PACKAGE_VER:-0.0.1-SNAPSHOT}
ENV PATH="/usr/local/maven/bin:${PATH}"

RUN wget http://apache.claz.org/maven/maven-3/3.6.1/binaries/apache-maven-3.6.1-bin.tar.gz -O /tmp/maven.tar.gz
RUN tar -xzvf /tmp/maven.tar.gz
RUN mv apache-maven-3.6.1 /usr/local/maven

ADD . /antifraud
WORKDIR /antifraud

RUN mvn install

CMD java -jar target/antifraud-${PACKAGE_VER}.jar
