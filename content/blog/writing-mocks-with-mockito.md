---
path: /writing-mocks-with-mockito
date: 2020-02-28T03:22:04.613Z
title: Writing Mocks with Mockito
description: Drinking and unit testing
---
Mockito is a mocking framework for Java that allows you to write clean and simple tests. It is [one of the most popular testing frameworks for Java](https://stackoverflow.com/questions/22697/whats-the-best-mock-framework-for-java). Mockito allows you to create **mock objects** in which you can define their behavior, thus making the tests for classes with dependencies on other classes much easier to write.

Writing tests using Mockito typically consists of:
* Mocking away external dependencies and inserting the mocks into the code under test
* Executing the code under test
* Asserting that the code executed correctly

#### Adding Mockito to your application
When it comes to Java development, I like to use Gradle. It is definitely possible to add Mockito to a Maven project, but this blog post will demonstrate how to add Mockito into a Gradle project.

Let's start by creating a Java project (assuming you have a JDK and Gradle installed). Inside of your terminal, create a new directory and initialize a Gradle project:
```
mkdir mockitoExample
cd mockitoExample
gradle init
```
Running `gradle init` will open the setup wizard. Select the following in each of the prompts:
* Select the type of project to generate: application
* Select implementation language: Java
* Select build script DSL: Groovy
* Select test framework: JUnit 4
* Project name: default (or press Enter)
* Source package: default (or press Enter)

Your Gradle project has now been initialized. You can now add Mockito to your project by opening `build.gradle` in a text editor and adding the following to the `dependencies` section:
```
dependencies {
    // auto-generated
    implementation 'com.google.guava:guava:28.1-jre'
    testImplementation 'junit:junit:4.12'

    // add this line
    testImplementation 'org.mockito:mockito-core:2+'
}
```
